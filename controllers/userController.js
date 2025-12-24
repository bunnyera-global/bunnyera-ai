const { User } = require('../models/user');
const logger = require('../logs/logger');

// 签到
exports.checkin = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user) return res.status(404).json({ error: 'User not found' });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const lastCheckIn = user.lastCheckIn ? new Date(user.lastCheckIn) : null;
        if (lastCheckIn) lastCheckIn.setHours(0, 0, 0, 0);

        if (lastCheckIn && lastCheckIn.getTime() === today.getTime()) {
            return res.json({ message: '今天已经签到过了哦～', points: user.points });
        }

        user.points += 10;
        user.lastCheckIn = new Date();
        await user.save();

        res.json({
            message: '签到成功',
            prompt: `叮咚～签到成功啦！✨
积分 +10 🪙 已到账～
小兔子给你准备了惊喜礼物 🎁
继续坚持，每天都有好运哦 🐰💕`,
            points: user.points,
            added: 10
        });
    } catch (error) {
        logger.error(`Checkin error: ${error.message}`);
        res.status(500).json({ error: 'Internal Error' });
    }
};

// 查询积分
exports.getPoints = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        res.json({
            points: user.points,
            message: `当前积分：${user.points} 🐰`
        });
    } catch (error) {
        logger.error(`GetPoints error: ${error.message}`);
        res.status(500).json({ error: 'Internal Error' });
    }
};
