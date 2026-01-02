const axios = require('axios');
const config = require('../config/config');
const logger = require('../logs/logger');

/**
 * 统一执行模型请求
 * 所有 generate / translate / chat 都会调用这里
 */
async function executeModelRequest(payload) {
    try {
        logger.info(`Executing model request via Gateway: ${config.gatewayUrl}`);

        const response = await axios.post(
            `${config.gatewayUrl}/v1/chat/completions`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (err) {
        logger.error(`Model execution error: ${err.message}`);

        return {
            error: true,
            message: err.message,
            details: err.response?.data || null
        };
    }
}

module.exports = {
    executeModelRequest
};