const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.sync({ alter: true }); // Sync database schema
        console.log('Database connected and models synced');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

module.exports = { sequelize, connectDB };
