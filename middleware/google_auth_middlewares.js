require('dotenv').config();

const { createUser } = require('../utils/sql_functions');
const jwt = require('jsonwebtoken');
const { createCookie } = require('../utils/cookies');


const googleAuth = async (req, res, next) => {
    if (!req.user) {
        return next(error)
    }
    try {
        // Crea usuario en DB
        const user = { name: req.user.displayName, email: req.user.email, password: require('crypto').randomBytes(64).toString('hex') }
        const dbUser = await createUser(user);
        console.log('User id from db: ' + dbUser.user_id)
        req.user.user_id = dbUser.user_id;

        // Se envía access token en cookie
        const accessToken = jwt.sign({ user_id: dbUser.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5s' });
        console.log('Created access token: ' + accessToken)
        createCookie(res, 'access_token', accessToken);

        // Se envía refresh token en cookie
        const refreshToken = jwt.sign({ user_id: dbUser.user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        console.log('Created refresh token: ' + refreshToken)
        await dbUser.update({ refresh_token: refreshToken })
        await dbUser.save();
        createCookie(res, 'refresh_token', refreshToken);

        return next()
    }
    catch (error) {
        return next(error)
    }
}

module.exports = googleAuth;