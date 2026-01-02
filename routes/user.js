const express = require('express');
const { User } = require('../models/user');

const router = express.Router();

// 获取用户信息
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 更新用户
router.put('/:id', async (req, res) => {
    try {
        await User.update(req.body, { where: { id: req.params.id } });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;