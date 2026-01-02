require('dotenv').config();

module.exports = {
    // 后端端口（Railway 会自动注入 PORT）
    port: process.env.PORT || 3001,

    // 模型网关地址（你的 gateway/index.js）
    gatewayUrl: process.env.GATEWAY_URL || `http://localhost:${process.env.GATEWAY_PORT || 3002}`,

    // 数据库连接（Railway 会用 DATABASE_URL）
    dbUri: process.env.DATABASE_URL || process.env.DB_URI || 'mysql://user:password@localhost:3306/bunnyera',

    // JWT 密钥
    jwtSecret: process.env.JWT_SECRET || 'bunnyera_secret_key',

    // SMS 服务
    smsApiKey: process.env.SMS_API_KEY,
    smsApiSecret: process.env.SMS_API_SECRET,

    // Telegram Bot
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN
};