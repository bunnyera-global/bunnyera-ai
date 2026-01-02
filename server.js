const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// OpenRouter 调用函数
async function callOpenRouter(messages, model = process.env.OPENROUTER_DEFAULT_MODEL) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "https://bunnyera.com",
      "X-Title": process.env.OPENROUTER_APP_NAME || "BunnyEra AI"
    },
    body: JSON.stringify({
      model,
      messages
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter Error: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

// 基础路由
app.get("/", (req, res) => {
  res.json({ ok: true, service: "BunnyEra AI Cloud API" });
});

// Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, model } = req.body;
    const reply = await callOpenRouter(messages, model);

    res.json({
      success: true,
      reply
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// WebSocket
wss.on("connection", (ws) => {
  ws.send(JSON.stringify({
    type: "message",
    content: "欢迎来到 BunnyEra Assistant 🐇"
  }));
});

// Railway 必须使用 process.env.PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`BunnyEra AI running on port ${PORT}`);
});