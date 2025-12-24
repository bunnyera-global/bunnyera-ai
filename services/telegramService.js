const TelegramBot = require('node-telegram-bot-api');
const config = require('../config/config');
const logger = require('../logs/logger');
const crypto = require('crypto');

let bot = null;

// 初始化 Telegram Bot
if (config.telegramBotToken && config.telegramBotToken !== 'your_telegram_bot_token') {
    try {
        bot = new TelegramBot(config.telegramBotToken, { polling: true });
        
        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            // 简单的回声测试
            if (msg.text === '/start') {
                bot.sendMessage(chatId, 'Welcome to BunnyEra AI Bot! 🐰');
            }
        });
        
        logger.info('Telegram Bot initialized');
    } catch (error) {
        logger.error(`Telegram Bot init failed: ${error.message}`);
    }
} else {
    logger.info('Telegram Bot Token not configured, skipping init.');
}

// 验证 Telegram 登录数据
// 参考: https://core.telegram.org/widgets/login#checking-authorization
exports.verifyTelegramAuth = (authData) => {
    // 如果没有配置 Token，且是开发环境，可能需要跳过或者总是失败
    // 这里如果 Token 是默认值，直接返回 true 方便测试 (或者 false 强制配置)
    // 为了方便演示，如果 Token 是默认值，我们假设验证通过 (仅限测试!!!)
    if (!config.telegramBotToken || config.telegramBotToken === 'your_telegram_bot_token') {
        logger.info('[Telegram Mock] Skipping signature verification due to default token');
        return true; 
    }

    try {
        const secretKey = crypto.createHash('sha256').update(config.telegramBotToken).digest();
        
        const { hash, ...data } = authData;
        
        if (!hash) return false;

        const checkString = Object.keys(data)
            .sort()
            .map(k => `${k}=${data[k]}`)
            .join('\n');
            
        const hmac = crypto.createHmac('sha256', secretKey)
            .update(checkString)
            .digest('hex');
            
        return hmac === hash;
    } catch (e) {
        logger.error(`Telegram verify error: ${e.message}`);
        return false;
    }
};
