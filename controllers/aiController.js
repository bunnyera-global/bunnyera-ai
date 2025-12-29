const axios = require('axios');
const config = require('../config/config');
const logger = require('../logs/logger');

// 通用 AI 调用函数 - 通过 Unified Model Gateway
const callAI = async (messages) => {
    try {
        // 构建 OpenAI 兼容的请求体
        const payload = {
            model: "default", // Gateway 决定具体模型
            messages: messages,
            temperature: 0.7
        };

        // 调用 Gateway
        const gatewayUrl = `${config.gatewayUrl}/v1/chat/completions`;
        logger.info(`Calling Gateway: ${gatewayUrl}`);

        const response = await axios.post(gatewayUrl, payload, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 60000 // 60s timeout
        });

        // 解析 OpenAI 格式响应
        if (response.data && response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0].message.content;
        } else {
            throw new Error('Invalid response format from Gateway');
        }

    } catch (error) {
        logger.error(`AI Gateway Call Failed: ${error.message}`);
        if (error.response) {
            logger.error(`Gateway Response: ${JSON.stringify(error.response.data)}`);
        }
        
        // 兜底回复
        return `[系统消息] AI 网关连接失败 (${error.message})。请检查 Gateway 是否运行在 ${config.gatewayUrl}，以及模型服务是否正常。🐰`;
    }
};

// 文本生成（推广文案）
exports.generateCopy = async (req, res) => {
    const { topic, platform, language } = req.body;
    
    if (!topic) {
        return res.status(400).json({ error: '请告诉我你想写什么主题的文案哦～' });
    }

    const messages = [
        {
            role: "system",
            content: `You are BunnyEra Assistant, a cute and professional cross-border e-commerce expert. 
            Tone: Engaging, Professional, yet Cute (use emojis like 🐰, ✨, 📦).`
        },
        {
            role: "user",
            content: `Task: Generate a promotional copy.
            Topic: ${topic}
            Platform: ${platform || 'General'}
            Language: ${language || 'Chinese'}`
        }
    ];

    try {
        const result = await callAI(messages);
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

    const messages = [
        {
            role: "system",
            content: `You are a professional translator. Maintain the original tone but ensure it fits the local culture.`
        },
        {
            role: "user",
            content: `Translate the following text to ${targetLang}:
            "${text}"`
        }
    ];

    try {
        const result = await callAI(messages);
        res.json({ 
            result, 
            message: '翻译完成啦！🌍' 
        });
    } catch (error) {
        res.status(500).json({ error: '翻译出错了 T_T' });
    }
};
