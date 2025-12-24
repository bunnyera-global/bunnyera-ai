const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require('../config/config');
const logger = require('../logs/logger');

// 初始化 Gemini
let genAI = null;
if (config.geminiApiKey) {
    genAI = new GoogleGenerativeAI(config.geminiApiKey);
}

// 通用 AI 调用函数
const callAI = async (prompt) => {
    // 1. 优先尝试 Gemini
    if (genAI) {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            if (text) return text;
        } catch (error) {
            logger.error(`Gemini Call Failed: ${error.message}`);
            // Gemini 失败，继续尝试 Ollama
        }
    }

    // 2. 尝试 Ollama
    try {
        const response = await axios.post(`${config.ollamaUrl}/api/generate`, {
            model: config.modelName === 'gemini-pro' ? 'qwen2.5:3b' : config.modelName, // Fallback model name if needed
            prompt: prompt,
            stream: false
        });
        return response.data.response;
    } catch (error) {
        logger.error(`Ollama Call Failed: ${error.message}`);
        
        // 3. 最后的兜底：模拟回复
        return `[模拟回复] 哎呀，AI 连接出了点小问题（可能是 Key 没配置或网络不通），但我依然觉得这个主意不错！🐰\n\n（请检查后端 .env 配置或确保 Ollama 已启动）`;
    }
};

// 文本生成（推广文案）
exports.generateCopy = async (req, res) => {
    const { topic, platform, language } = req.body;
    
    if (!topic) {
        return res.status(400).json({ error: '请告诉我你想写什么主题的文案哦～' });
    }

    const systemPrompt = `You are BunnyEra Assistant, a cute and professional cross-border e-commerce expert. 
    Task: Generate a promotional copy.
    Topic: ${topic}
    Platform: ${platform || 'General'}
    Language: ${language || 'Chinese'}
    Tone: Engaging, Professional, yet Cute (use emojis like 🐰, ✨, 📦).`;

    try {
        const result = await callAI(systemPrompt);
        res.json({ 
            result, 
            message: '文案生成好啦！看看满不满意？🐰' 
        });
    } catch (error) {
        res.status(500).json({ error: '生成失败了，请稍后再试 T_T' });
    }
};

// 翻译
exports.translate = async (req, res) => {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
        return res.status(400).json({ error: '请提供原文和目标语言哦～' });
    }

    const systemPrompt = `You are a professional translator. 
    Translate the following text to ${targetLang}. 
    Maintain the original tone but ensure it fits the local culture.
    Text: "${text}"`;

    try {
        const result = await callAI(systemPrompt);
        res.json({ 
            result, 
            message: '翻译完成啦！🌍' 
        });
    } catch (error) {
        res.status(500).json({ error: '翻译出错了 T_T' });
    }
};
