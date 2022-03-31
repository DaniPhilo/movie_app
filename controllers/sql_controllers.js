const { createUser, findUserByEmail } = require('../utils/sql_functions');
const { signUpValidations, loginValidations } = require('../utils/formulary_validations');
const { createHash } = require('../utils/hashing');
const { AuthenticationError } = require('../errors/errors');
const { hash } = require('bcrypt');
const signUp = async (req, res, next) => {
    const data = {
        name: req.body['signup-name'],
        email: req.body['signup-email'],
        password: req.body['signup-password'],
        password2: req.body['signup-password2']
    }
    try {
        await signUpValidations(data);
        data.password = await createHash(data.password);
        const newUser = await createUser(data);
        res.send(newUser);
    }
    catch(error) {
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
        res.send({message: `Correct login validation: ${user.email}`})
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    signUp,
    logIn
}