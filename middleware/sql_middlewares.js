const { createUser, findUserByEmail } = require('../utils/sql_functions');
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

module.exports = {
    signUp,
    logIn
}