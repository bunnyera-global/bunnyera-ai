const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.GATEWAY_PORT || 3001;

// Configuration
const CONFIG = {
  OPENAI: {
    target: 'https://api.openai.com',
    headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
  },
  AZURE: {
    target: process.env.AZURE_OPENAI_ENDPOINT, // e.g., https://my-resource.openai.azure.com/
    headers: { 'api-key': process.env.AZURE_OPENAI_KEY }
  },
  LOCAL: {
    target: process.env.OLLAMA_URL || 'http://localhost:11434',
    headers: {}
  }
};

// Default Provider
const DEFAULT_PROVIDER = process.env.MODEL_PROVIDER || 'LOCAL'; // LOCAL, OPENAI, AZURE

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (_, res) => res.json({
  status: 'ok',
  service: 'BunnyERA-Model-Gateway',
  provider: DEFAULT_PROVIDER
}));

// Request Logger
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.url} -> ${DEFAULT_PROVIDER}`);
  next();
});

// Routing Logic for /v1/*
// This proxy dynamically selects the target based on the environment configuration.
// Future enhancement: Inspect req.body.model to route to different providers dynamically.
const modelProxy = createProxyMiddleware({
  router: (req) => {
    // Dynamic routing strategy could go here
    // For now, use the configured default provider
    const provider = CONFIG[DEFAULT_PROVIDER] || CONFIG.LOCAL;
    return provider.target;
  },
  changeOrigin: true,
  pathRewrite: (path, req) => {
    // Azure OpenAI requires specific path format: /openai/deployments/{deployment-id}/...
    // This is a simplified handler. 
    if (DEFAULT_PROVIDER === 'AZURE') {
      // Azure logic might be complex, keeping it simple for now or pass-through
      return path;
    }
    return path;
  },
  onProxyReq: (proxyReq, req) => {
    const provider = CONFIG[DEFAULT_PROVIDER] || CONFIG.LOCAL;

    // Inject Auth Headers if not present in client request
    if (provider.headers) {
      Object.entries(provider.headers).forEach(([key, value]) => {
        if (value && !req.headers[key.toLowerCase()]) {
          proxyReq.setHeader(key, value);
        }
      });
    }
  },
  onError: (err, req, res) => {
    console.error('[Gateway Error]', err);
    res.status(500).json({ error: 'Proxy Error', details: err.message });
  }
});

app.use('/v1', modelProxy);

// Legacy/Specific Routes
app.use('/local', createProxyMiddleware({
  target: 'http://localhost:8080', // Tabby or other local service
  changeOrigin: true,
}));

app.listen(PORT, () => {
  console.log(`🚀 BunnyERA Model Gateway running on http://localhost:${PORT}`);
  console.log(`👉 Mode: ${DEFAULT_PROVIDER}`);
});
