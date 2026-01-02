const express = require('express');
const axios = require('axios');
const config = require('../config/config');

const router = express.Router();

// 翻译（也走 Gateway）
router.post('/', async (req, res) => {
    try {
        const response = await axios.post(`${config.gatewayUrl}/v1/chat/completions`, {
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "你是一个翻译助手" },
                { role: "user", content: req.body.text }
            ]
        });

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;