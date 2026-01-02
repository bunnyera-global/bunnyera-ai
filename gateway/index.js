const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.GATEWAY_PORT || 3001;

// Provider Configurations
const CONFIG = {
  OPENAI: {
    target: 'https://api.openai.com',
    headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
  },
  AZURE: {
    target: process.env.AZURE_OPENAI_ENDPOINT,
    headers: { 'api-key': process.env.AZURE_OPENAI_KEY }
  },
  LOCAL: {
    target: process.env.OLLAMA_URL || 'http://localhost:11434',
    headers: {}
  }
};

// Default Provider
const DEFAULT_PROVIDER = process.env.MODEL_PROVIDER || 'LOCAL';

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (_, res) => {
  res.json({
    status: 'ok',
    service: 'BunnyERA-Model-Gateway',
    provider: DEFAULT_PROVIDER
  });
});

// Request Logger
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.url} -> ${DEFAULT_PROVIDER}`);
  next();
});

// Proxy for /v1/*
const modelProxy = createProxyMiddleware({
  router: () => {
    const provider = CONFIG[DEFAULT_PROVIDER] || CONFIG.LOCAL;
    return provider.target;
  },
  changeOrigin: true,
  pathRewrite: (path) => path,
  onProxyReq: (proxyReq) => {
    const provider = CONFIG[DEFAULT_PROVIDER] || CONFIG.LOCAL;

    if (provider.headers) {
      Object.entries(provider.headers).forEach(([key, value]) => {
        if (value) proxyReq.setHeader(key, value);
      });
    }
  },
  onError: (err, req, res) => {
    console.error('[Gateway Error]', err);
    res.status(500).json({ error: 'Proxy Error', details: err.message });
  }
});

app.use('/v1', modelProxy);

// Legacy Local Route
app.use('/local', createProxyMiddleware({
  target: 'http://localhost:8080',
  changeOrigin: true
}));

app.listen(PORT, () => {
  console.log(`🚀 BunnyERA Model Gateway running on http://localhost:${PORT}`);
  console.log(`👉 Mode: ${DEFAULT_PROVIDER}`);
});