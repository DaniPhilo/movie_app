const { Sequelize, STRING, DataTypes } = require('sequelize');
const { db, connectSQL } = require('../db/sql_connection');

const Favourite = db.define('Favourite', {
    favourite_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imbd_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    director: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    plot: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        underscored: true
    });
    
module.exports = Favourite;