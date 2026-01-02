const axios = require('axios');
const config = require('../config/config');
const logger = require('../logs/logger');

/**
 * Qwen（通义千问）模型执行器
 * 所有 Qwen 请求都从这里走
 */
async function callQwenModel(prompt) {
    try {
        logger.info(`Calling Qwen model via Gateway: ${config.gatewayUrl}`);

        const payload = {
            model: "qwen2.5-7b-instruct",   // 可换成你自己的模型
            messages: [
                { role: "user", content: prompt }
            ]
        };

        const response = await axios.post(
            `${config.gatewayUrl}/v1/chat/completions`,
            payload,
            { headers: { "Content-Type": "application/json" } }
        );

        return {
            success: true,
            data: response.data
        };

    } catch (err) {
        logger.error(`Qwen model error: ${err.message}`);

        return {
            success: false,
            error: err.message,
            details: err.response?.data || null
        };
    }
}

module.exports = {
    callQwenModel
};