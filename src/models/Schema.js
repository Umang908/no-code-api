const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Schema = sequelize.define('Schema', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    tableName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fields: {
        type: DataTypes.JSON, // Stores columns as JSON
        allowNull: false
    }
}, {
    tableName: 'Schema',         // 👈 fixed table name
    freezeTableName: true,       // 👈 don't auto-pluralize
    timestamps: true
});

module.exports = Schema;
Schema.sync(); // ensures table exists

