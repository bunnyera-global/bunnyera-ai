const express = require('express');
const axios = require('axios');
const config = require('../config/config');

const router = express.Router();

// Chat API（走 Gateway）
router.post('/', async (req, res) => {
    try {
        const response = await axios.post(`${config.gatewayUrl}/v1/chat/completions`, req.body);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;