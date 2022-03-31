const { Sequelize, DataTypes } = require('sequelize');
const { db, connectSQL } = require('../db/sql_connection');

const User = db.define('User', {
    user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    favourites: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},
    {
        underscored: true
    });
    
module.exports = User;