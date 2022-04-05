require('dotenv').config();

const { createCookie } = require('../utils/cookies');
const { findUserById, findUserByEmail } = require('../utils/sql_functions');
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
        const refreshToken = jwt.sign({ user_id: req.user.user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
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
        const error = new ForbiddenError('No access token provided');
        return next(error)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            req.params.auth = 'False';
        }

        // Metemos user_id en req.user para tener siempre disponible en cada page la id de la DB del usuario.
        req.user = user;
        return next();
    });
}

const authenticateRefreshToken = async (req, res, next) => {

    if (req.params.auth !== 'False') {
        return next();
    }

    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        const error = new ForbiddenError('No refresh token provided')
        return next(error)
    }
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
            const error = new ForbiddenError('Invalid refresh token provided')
            return next(error)
        }

        const dbUser = await findUserById(user.user_id);
        if (refreshToken !== dbUser.refresh_token) {
            const error = new ForbiddenError('Refresh token does not match DB')
            return next(error)
        }
        
        const accessToken = jwt.sign({ user_id: dbUser.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5s' });

        const newRefreshToken = jwt.sign({ user_id: dbUser.user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        await dbUser.update({ refresh_token: newRefreshToken })
        await dbUser.save();

        

        createCookie(res, 'access_token', accessToken);
        createCookie(res, 'refresh_token', newRefreshToken);
        
        // Metemos user_id en req.user para tener siempre disponible en cada page la id de la DB del usuario.
        req.user = user;

        return next();
    });

}

module.exports = {
    createAccessToken,
    createRefreshToken,
    authenticateToken,
    authenticateRefreshToken
}