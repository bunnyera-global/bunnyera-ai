const logger = require('../logs/logger');

// 发送验证码 (模拟)
exports.sendCode = async (phone, code) => {
    logger.info(`[SMS Mock] Sending SMS code ${code} to ${phone}`);
    // 在真实场景中，这里会调用短信服务商 API
    return true;
};

// 验证验证码 (模拟)
exports.verifyCode = async (phone, code) => {
    // 在真实场景中，这里会查询 Redis 或数据库
    // 这里的 "123456" 是通用测试验证码
    if (code === '123456') return true;
    
    // 假设任何非 123456 的码都校验失败 (除非有真实存储)
    return false;
};
