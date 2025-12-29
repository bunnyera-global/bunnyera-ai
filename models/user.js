const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

let sequelize;

if (process.env.DB_DIALECT === 'mysql' || process.env.DB_DIALECT === 'postgres') {
    // 生产环境：使用外部数据库 (MySQL/PostgreSQL)
    console.log(`🔌 Connecting to external database (${process.env.DB_DIALECT})...`);
    sequelize = new Sequelize(process.env.DB_URI, {
        dialect: process.env.DB_DIALECT,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
} else {
    // 开发/默认环境：使用本地 SQLite
    console.log('📂 Using local SQLite database...');
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.sqlite',
        logging: false
    });
}

// 定义 User 模型
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '用户ID'
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        validate: {
            isEmail: true
        },
        comment: '用户邮箱'
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        comment: '手机号码'
    },
    telegramId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        comment: 'Telegram ID'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '加密密码'
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '用户积分'
    },
    lastCheckIn: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '最后签到时间'
    }
}, {
    tableName: 'users',
    timestamps: true,
    comment: '用户表'
});

// 导出模型和实例
module.exports = { User, sequelize };
