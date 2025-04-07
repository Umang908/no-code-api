const Schema = require('../models/Schema');
const { sequelize } = require('../../config/database');

const createSchema = async (req, res) => {
    try {
        const { tableName, fields } = req.body;
        const userId = req.user.id;

        console.log('userId:', userId);
        console.log('tableName:', tableName);
        console.log('fields:', fields);
        // Ensure table name is valid
        if (!tableName || !fields || Object.keys(fields).length === 0) {
            return res.status(400).json({ message: 'Invalid schema data' });
        }

        // Create table dynamically
        const tableDefinition = {};
        for (const [key, value] of Object.entries(fields)) {
            tableDefinition[key] = { type: sequelize.Sequelize[value.toUpperCase()] };
        }

        const dynamicTable = sequelize.define(tableName, tableDefinition, { timestamps: true });
        await dynamicTable.sync();

        // Save schema metadata
        await Schema.create({ userId, tableName, fields });

        res.status(201).json({ message: `Table '${tableName}' created successfully`, tableName, fields });
    } catch (error) {
        res.status(500).json({ message: 'Error creating schema', error });
    }
};

const getSchemas = async (req, res) => {
    try {
        const userId = req.user.id;
        const schemas = await Schema.findAll({ where: { userId } });

        res.json({ schemas });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schemas', error });
    }
};

module.exports = { createSchema, getSchemas };