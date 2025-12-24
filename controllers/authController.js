const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const config = require('../config/config');
const smsService = require('../services/smsService');
const telegramService = require('../services/telegramService');
const logger = require('../logs/logger');

// 生成 JWT Token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, phone: user.phone },
        config.jwtSecret,
        { expiresIn: '7d' }
    );
};

// 手机号注册/登录
exports.registerPhone = async (req, res) => {
    try {
        const { phone, code } = req.body;
        if (!phone || !code) {
            return res.status(400).json({ error: '请提供手机号和验证码' });
        }

        // 验证短信验证码
        const isValid = await smsService.verifyCode(phone, code);
        if (!isValid) {
            return res.status(400).json({ error: '验证码错误' });
        }

        let user = await User.findOne({ where: { phone } });
        if (!user) {
            // 新用户注册
            user = await User.create({ phone, points: 100 }); // 注册送积分
            logger.info(`New user registered via phone: ${phone}`);
        }

        const token = generateToken(user);
        res.json({
            message: '登录成功',
            token,
            user: { id: user.id, phone: user.phone, points: user.points },
            prompt: `欢迎来到 BunnyEra Assistant 🐇
我是蹦蹦跳跳的小兔子尹楠～
每天签到都有小礼物 🎁，
让我帮你轻松搞定跨境电商的烦恼吧！`
        });
    } catch (error) {
        logger.error(`Phone login error: ${error.message}`);
        res.status(500).json({ error: '服务器内部错误' });
    }
};

// 邮箱登录
exports.loginEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: '请提供邮箱和密码' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: '用户不存在' });
        }

        // 如果用户没有密码（可能是手机注册的），则需要设置密码
        if (!user.password) {
            return res.status(401).json({ error: '请使用手机验证码登录并设置密码' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: '密码错误' });
        }

        const token = generateToken(user);
        res.json({
            message: '登录成功',
            token,
            user: { id: user.id, email: user.email, points: user.points },
            prompt: `欢迎来到 BunnyEra Assistant 🐇
我是蹦蹦跳跳的小兔子尹楠～
每天签到都有小礼物 🎁，
让我帮你轻松搞定跨境电商的烦恼吧！`
        });
    } catch (error) {
        logger.error(`Email login error: ${error.message}`);
        res.status(500).json({ error: '服务器内部错误' });
    }
};

// 邮箱注册
exports.registerEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: '请提供邮箱和密码' });
        }

        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ error: '邮箱已被注册' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            email,
            password: hashedPassword,
            points: 100
        });

        const token = generateToken(user);
        res.json({
            message: '注册成功',
            token,
            user: { id: user.id, email: user.email, points: user.points },
            prompt: `欢迎来到 BunnyEra Assistant 🐇
我是蹦蹦跳跳的小兔子尹楠～
每天签到都有小礼物 🎁，
让我帮你轻松搞定跨境电商的烦恼吧！`
        });
    } catch (error) {
        logger.error(`Email register error: ${error.message}`);
        res.status(500).json({ error: '服务器内部错误' });
    }
};

// Telegram 登录
exports.loginTelegram = async (req, res) => {
    try {
        const authData = req.body;

        // 验证 Telegram 数据
        const isValid = telegramService.verifyTelegramAuth(authData);
        if (!isValid) {
            return res.status(401).json({ error: 'Telegram 验证失败' });
        }

        const telegramId = authData.id.toString();
        let user = await User.findOne({ where: { telegramId } });

        if (!user) {
            // 新用户
            user = await User.create({
                telegramId,
                username: authData.username,
                firstName: authData.first_name,
                lastName: authData.last_name,
                points: 100
            });
            logger.info(`New user registered via Telegram: ${telegramId}`);
        }

        const token = generateToken(user);
        res.json({
            message: '登录成功',
            token,
            user: {
                id: user.id,
                telegramId: user.telegramId,
                username: user.username,
                points: user.points
            },
            prompt: `欢迎来到 BunnyEra Assistant 🐇
我是蹦蹦跳跳的小兔子尹楠～
每天签到都有小礼物 🎁，
让我帮你轻松搞定跨境电商的烦恼吧！`
        });
    } catch (error) {
        logger.error(`Telegram login error: ${error.message}`);
        res.status(500).json({ error: '服务器内部错误' });
    }
};
