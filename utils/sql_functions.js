const Sequelize = require('sequelize');
const User = require('../models/users_models');

const createUser = async (data) => {
    const { name, email, password } = data;
    try {
        const newUser = await User.create({ name, email, password });
        return newUser
    } catch (error) {
        console.log(error);
    }
}

const findUserById = async (id) => {
    try {
        const response = await User.findOne({ where: { user_id: id } });
        return response
    }
    catch (error) {
        console.log(error);
    }
}

const findUserByEmail = async (email) => {
    try {
        const response = await User.findOne({ where: { email: email } });
        return response
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    createUser,
    findUserById,
    findUserByEmail
}