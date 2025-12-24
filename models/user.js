const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

// 初始化 Sequelize 实例
// 优先使用 SQLite 以确保零配置运行
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false
});

// 如果需要切换回 MySQL，请注释上面代码并使用下面代码：
/*
const sequelize = new Sequelize(config.dbUri, {
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
*/

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
