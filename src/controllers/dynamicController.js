const { sequelize } = require('../../config/database');
const Schema = require('../models/Schema');

const handleCRUD = async (req, res) => {
    try {
        const { table, id } = req.params;
        const method = req.method;
        const userId = req.user.id;

        // Fetch schema
        const schema = await Schema.findOne({ where: { tableName: table, userId } });
        if (!schema) return res.status(404).json({ message: 'Table not found' });

        // Define table dynamically
        const tableDefinition = {};
        for (const [key, value] of Object.entries(schema.fields)) {
            tableDefinition[key] = { type: sequelize.Sequelize[value.toUpperCase()] };
        }
        const DynamicTable = sequelize.define(table, tableDefinition, { timestamps: true });

        // CRUD Operations
        if (method === 'POST') {
            const record = await DynamicTable.create(req.body);
            return res.status(201).json(record);
        } else if (method === 'GET' && id) {
            const record = await DynamicTable.findByPk(id);
            return res.json(record || { message: 'Record not found' });
        } else if (method === 'GET') {
            const records = await DynamicTable.findAll();
            return res.json(records);
        } else if (method === 'PUT' && id) {
            await DynamicTable.update(req.body, { where: { id } });
            return res.json({ message: 'Record updated successfully' });
        } else if (method === 'DELETE' && id) {
            await DynamicTable.destroy({ where: { id } });
            return res.json({ message: 'Record deleted successfully' });
        }

        return res.status(400).json({ message: 'Invalid request' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { handleCRUD };