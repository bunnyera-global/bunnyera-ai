const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');

// 根据环境变量控制鉴权
const requireAuth = process.env.REQUIRE_AUTH === 'true';
if (requireAuth) {
    router.post('/', authMiddleware, aiController.generateCopy);
} else {
    router.post('/', aiController.generateCopy);
}

module.exports = router;
