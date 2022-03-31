require('dotenv').config();

const { createCookie } = require('../utils/cookie_creation');
const { findUserByEmail } = require('../utils/sql_functions');
const jwt = require('jsonwebtoken');

const { ForbiddenError } = require('../errors/errors');

const createAccessToken = (req, res, next) => {
    try {
        const accessToken = jwt.sign({ user_id: req.user.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5s' });
        createCookie(res, 'access_token', accessToken);
        return next();
    }
    catch (error) {
        return next(error);
    }
}

const createRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = jwt.sign({ user_id: req.user.user_id }, process.env.REFRESH_TOKEN_SECRET);
        const user = await findUserByEmail(req.user.email);
        await user.update({ refresh_token: refreshToken});
        await user.save();
        createCookie(res, 'refresh_token', refreshToken);
        return next();
    }
    catch (error) {
        return next(error);
    }
}

const authenticateToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        const error = new ForbiddenError('No refresh token provided');
        return next(error)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            req.params.auth = 'False';
        }
        return next();
    });
}

const refreshToken = (req, res, next) => {
    if (req.params.auth !== 'False') {
        return next();
    }
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
        const error = new ForbiddenError('No refresh token provided')
        return next(error)
    }
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            const error = new ForbiddenError('Invalid refresh token provided')
            return next(error)
        }

        req.user = user;
        const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5s' })
        createCookie(res, 'access_token', accessToken);
        return next();
    });

}

module.exports = {
    createAccessToken,
    createRefreshToken,
    authenticateToken,
    refreshToken
}