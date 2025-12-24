const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 手机号注册/登录
router.post('/register-phone', authController.registerPhone);

// 邮箱登录
router.post('/login-email', authController.loginEmail);

// 邮箱注册
router.post('/register-email', authController.registerEmail);

// Telegram 登录
router.post('/login-telegram', authController.loginTelegram);

module.exports = router;
