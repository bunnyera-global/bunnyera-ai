const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

let sequelize;

// Railway 优先使用 DATABASE_URL
if (process.env.DATABASE_URL) {
    console.log(`🔌 Connecting to Railway database...`);
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false,
        dialectOptions: {
            ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false
        }
    });
}

// 明确指定 MySQL / Postgres
else if (process.env.DB_DIALECT === 'mysql' || process.env.DB_DIALECT === 'postgres') {
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
}

// 默认使用 SQLite（本地开发）
else {
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
        validate: { isEmail: true },
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