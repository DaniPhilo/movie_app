const { createUser, findUserByEmail } = require('../utils/sql_functions');

const googleAuth = async (req, res, next) => {
    if (!req.user) {
        return next(error)
    }

    try {
        const userData = { name: req.user.displayName, email: req.user.email, password: require('crypto').randomBytes(64).toString('hex') }
        // Comprobamos que el usuario no esté ya en la DB:
        const foundUser = await findUserByEmail(userData.email);
        if (foundUser) {
            req.user = foundUser;
            return next();
        }
        // Crea usuario en DB
        const newUser = await createUser(userData);

        req.user.user_id = newUser.user_id;

        return next()
    }
    catch (error) {
        return next(error)
    }
}

module.exports = googleAuth;