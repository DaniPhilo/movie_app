const Sequelize = require('sequelize');
const { db, connectSQL } = require('../db/sql_connection');
const User = require('../models/users_models');
const Favourite = require('../models/favourites_model');

const createUser = async (data) => {
    const { name, email, password } = data;
    try {
        const newUser = await User.create({ name, email, password });
        return newUser
    } catch (error) {
        console.log(error);
    }
}

const findUser = async (userId) => {
    try {
        const response = await User.findOne({ where: { user_id: userId } });
        const user = response.dataValues;
    }
    catch (error) {
        console.log(error);
    }
}

const addToFavourites = async (data) => {
    try {
        const newFav = await Favourite.create(data);
        // Updates user table adding favourites_id to user's list
        const user = await User.findOne({ where: { user_id: newFav.user_id } });
        await user.update({ 'favourites': Sequelize.fn('array_append', Sequelize.col('favourites'), newFav.favourite_id)});
    }
    catch (error) {
        console.log(error);
    }
}
// addToFavourites({
//     user_id: '0a0e16c0-ae8d-11ec-b68a-0f6e736b44c7',
//     imbd_id: 'xxxxx11111',
//     title: 'Titanic',
//     year: 1999,
//     director: 'James Cameron',
//     genre: ['drama', 'romance'],
//     plot: 'Boat goes "brrrr brrrr", then it goes "scratch!", then everybody goes "aaaahhhhh!".',
//     duration: 'A lot',
//     img: 'https://wikipedia.com'
// });



module.exports = {
    createUser,
    findUser,
    addToFavourites
}