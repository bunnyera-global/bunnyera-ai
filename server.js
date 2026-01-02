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
const chatRoutes = require('./routes/chatRoutes'); // 🐰 Chat API

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// CORS 配置（Railway + Vercel 必须允许）
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:8080',
        'https://ai.bunnyera.com',
        process.env.FRONTEND_URL // Railway 推荐
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
app.use('/api/chat', chatRoutes);

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

    ws.send(JSON.stringify({
        type: 'message',
        content: `欢迎来到 BunnyEra Assistant 🐇
我是蹦蹦跳跳的小兔子尹楠～
有什么可以帮你的吗？`
    }));

    ws.on('message', (message) => {
        logger.info(`Received: ${message}`);

        setTimeout(() => {
            ws.send(JSON.stringify({
                type: 'reply',
                content: `小兔子收到你的消息啦："${message}" 🐰\n正在努力思考中...`
            }));
        }, 1000);
    });
});

// 错误处理
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 启动服务
sequelize.sync()
    .then(() => {
        logger.info('Database synced');
        server.listen(config.port, () => {
            logger.info(`Server running on port ${config.port}`);
            console.log(`Server running on port ${config.port}`);
        });
    })
    .catch(err => {
        logger.error(`Database sync error: ${err.message}`);
        server.listen(config.port, () => {
            console.log(`Server running on port ${config.port} (DB Failed)`);
        });
    });