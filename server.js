const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const config = require('./config/config');
const logger = require('./logs/logger');
const { sequelize } = require('./models/user');

// 路由导入
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const generateRoutes = require('./routes/generate');
const translateRoutes = require('./routes/translate');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 中间件
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://ai.bunnyera.com'
    ],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 日志中间件
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// 路由挂载
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/generate', generateRoutes);
app.use('/translate', translateRoutes);

// 基础路由
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to BunnyEra AI API 🐰' });
});
app.get('/health', (req, res) => {
    res.send('OK');
});

// WebSocket 处理
wss.on('connection', (ws) => {
    logger.info('New WebSocket connection');

    // 发送欢迎语
    ws.send(JSON.stringify({
        type: 'message',
        content: `欢迎来到 BunnyEra Assistant 🐇
我是蹦蹦跳跳的小兔子尹楠～
有什么可以帮你的吗？`
    }));

    ws.on('message', (message) => {
        logger.info(`Received: ${message}`);

        // 模拟 AI 回复 (后续可接入 aiController)
        setTimeout(() => {
            ws.send(JSON.stringify({
                type: 'reply',
                content: `小兔子收到你的消息啦："${message}" 🐰\n正在努力思考中... (目前是自动回复哦)`
            }));
        }, 1000);
    });
});

// 错误处理
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 启动服务前同步数据库 (仅开发环境)
sequelize.sync().then(() => {
    logger.info('Database synced');
    server.listen(config.port, () => {
        logger.info(`Server is running on port ${config.port}`);
        console.log(`Server is running on port ${config.port}`);
    });
}).catch(err => {
    logger.error(`Database sync error: ${err.message}`);
    // 即使数据库失败，也尝试启动 Server (为了测试非 DB 路由)
    server.listen(config.port, () => {
        console.log(`Server is running on port ${config.port} (DB Failed)`);
    });
});
