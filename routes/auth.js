const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const config = require('../config/config');

const router = express.Router();

// 注册
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hashed });

        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 登录
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: '用户不存在' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: '密码错误' });

        const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '7d' });

        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;