const { createUser } = require('../utils/sql_functions');

const googleAuth = async (req, res, next) => {
    if (!req.user) {
        return next(error)
    }

    // else if user está en DB (findByEmail), req.user.user_id = dbUser.user_id and next()

    try {
        // Crea usuario en DB
        const user = { name: req.user.displayName, email: req.user.email, password: require('crypto').randomBytes(64).toString('hex') }
        const dbUser = await createUser(user);
        req.user.user_id = dbUser.user_id;

        return next()
    }
    catch (error) {
        return next(error)
    }
}

module.exports = googleAuth;