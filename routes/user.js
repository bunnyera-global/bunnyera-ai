const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// 签到 (需要登录)
router.post('/checkin', authMiddleware, userController.checkin);

// 查询积分 (需要登录)
router.get('/points', authMiddleware, userController.getPoints);

module.exports = router;
