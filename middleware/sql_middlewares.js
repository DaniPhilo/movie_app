const { Sequelize } = require('sequelize');
const User = require('../models/users_models');
const { createUser, findUserById, findUserByEmail } = require('../utils/sql_functions');
const { signUpValidations, loginValidations } = require('../utils/validations');
const { createHash } = require('../utils/hashing');
const { BadRequest, AuthenticationError } = require('../errors/errors');

const signUp = async (req, res, next) => {
    const data = {
        name: req.body['signup-name'],
        email: req.body['signup-email'],
        password: req.body['signup-password'],
        password2: req.body['signup-password2']
    }
    const user = await findUserByEmail(data.email);
    if (user) {
        const error = new BadRequest('User with this email already in database', 'signup');
        return next(error)
    }
    try {
        await signUpValidations(data);
        data.password = await createHash(data.password);
        const newUser = await createUser(data);

        req.user = newUser;

        return next()
    }
    catch (error) {
        return next(error)
    }
}

const logIn = async (req, res, next) => {
    const data = {
        email: req.body['login-email'],
        password: req.body['login-password']
    }
    try {
        const user = await findUserByEmail(data.email);
        if (!user) {
            throw new AuthenticationError('Wrong email or password');
        }

        const hashedPassword = user.password;
        const result = await loginValidations(data.password, hashedPassword);
        if (!result) {
            throw new AuthenticationError('Wrong email or password');
        }

        req.user = user;

        return next()
    }
    catch (error) {
        next(error)
    }
}

const addToFavourites = async (req, res, next) => {
    try {
        const movie = req.body.movieID;
        const user = await findUserById(req.user.user_id);
        user.favourites
        User.update(
            { 'favourites': Sequelize.fn('array_append', Sequelize.col('favourites'), movie) },
            { 'where': { 'user_id': req.user.user_id } }
           );

        res.end();
    } catch (error) {
        return next(error)
    }
}

const getFavourites = async (id) => {
    try {
        const user = await findUserById(id);
        return user.favourites
    } catch (error) {
        console.log(error);
    }
}

const deleteFromFavourites = async (req, res, next) => {
    console.log('Entered delete fav route')
    try {
        const movie = req.body.movieID;
        const user = await findUserById(req.user.user_id);
        const favourites = user.favourites;
        favourites.map((item, index) => {
            if (item === movie) {
                favourites.splice(index, 1);
            }
        });
        
        await User.update({ favourites: favourites }, {
            where: { user_id: req.user.user_id }
            });

        res.end()
        
    } catch (error) {
        
    }
}

module.exports = {
    signUp,
    logIn,
    addToFavourites,
    getFavourites,
    deleteFromFavourites
}