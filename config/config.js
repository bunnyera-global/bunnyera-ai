require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3001,
    dbUri: process.env.DB_URI || 'mysql://user:password@localhost:3306/bunnyera',
    jwtSecret: process.env.JWT_SECRET || 'bunnyera_secret_key',
    smsApiKey: process.env.SMS_API_KEY,
    smsApiSecret: process.env.SMS_API_SECRET,
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    geminiApiKey: process.env.GEMINI_API_KEY,
    modelName: process.env.MODEL_NAME || 'gemini-pro',
    ollamaUrl: process.env.OLLAMA_URL || 'http://localhost:11434'
};
