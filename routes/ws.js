const WebSocket = require('ws');
const logger = require('../logs/logger');

/**
 * 初始化 WebSocket 服务
 * @param {http.Server} server - 传入 server.js 创建的 HTTP Server
 */
function initWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    logger.info('WebSocket Server initialized');

    wss.on('connection', (ws) => {
        logger.info('New WebSocket connection');

        // 发送欢迎消息
        ws.send(JSON.stringify({
            type: 'message',
            content: `欢迎来到 BunnyEra Assistant 🐇
我是蹦蹦跳跳的小兔子尹楠～
有什么可以帮你的吗？`
        }));

        // 收到消息
        ws.on('message', (message) => {
            logger.info(`WS Received: ${message}`);

            // 模拟 AI 回复
            setTimeout(() => {
                ws.send(JSON.stringify({
                    type: 'reply',
                    content: `小兔子收到你的消息啦："${message}" 🐰`
                }));
            }, 800);
        });

        // 断开连接
        ws.on('close', () => {
            logger.info('WebSocket connection closed');
        });

        // 错误处理
        ws.on('error', (err) => {
            logger.error(`WebSocket error: ${err.message}`);
        });
    });

    return wss;
}

module.exports = {
    initWebSocket
};