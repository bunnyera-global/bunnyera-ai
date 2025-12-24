const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');

// 翻译 (需要登录)
router.post('/', authMiddleware, aiController.translate);

module.exports = router;
