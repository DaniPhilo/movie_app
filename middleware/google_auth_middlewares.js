const { createUser, findUserByEmail } = require('../utils/sql_functions');

const googleAuth = async (req, res, next) => {
    if (!req.user) {
        return next(error)
    }

    console.log('Google in')
    // else if user está en DB (findByEmail), req.user.user_id = dbUser.user_id and next()

    try {
        const userData = { name: req.user.displayName, email: req.user.email, password: require('crypto').randomBytes(64).toString('hex') }
        // Comprobamos que el usuario no esté ya en la DB:
        const foundUser = await findUserByEmail(userData.email);
        if (foundUser) {
            req.user = foundUser;
            console.log('If foundUser: '+(JSON.stringify(foundUser)))
            return next();
        }
        // Crea usuario en DB
        const newUser = await createUser(userData);
        console.log(JSON.stringify(newUser))
        req.user.user_id = newUser.user_id;

        return next()
    }
    catch (error) {
        return next(error)
    }
}

module.exports = googleAuth;