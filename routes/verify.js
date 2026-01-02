const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = require('../logs/logger');

/**
 * 验证 JWT Token
 */
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: '缺少 Token' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), config.jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        logger.error(`Token 验证失败: ${err.message}`);
        return res.status(401).json({ error: 'Token 无效或已过期' });
    }
}

/**
 * 验证邮箱格式
 */
function verifyEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * 验证手机号格式（国际通用）
 */
function verifyPhone(phone) {
    const regex = /^[0-9+\-() ]{6,20}$/;
    return regex.test(phone);
}

/**
 * 验证验证码（6 位数字）
 */
function verifyCode(code) {
    return /^[0-9]{6}$/.test(code);
}

module.exports = {
    verifyToken,
    verifyEmail,
    verifyPhone,
    verifyCode
};