const { signUp, logIn, addToFavourites } = require('./sql_middlewares');
const { createAccessToken, createRefreshToken, authenticateToken, authenticateRefreshToken } = require('./jwt_middlewares');
const { renderRecoveryPage, sendRecoveryEmail, renderRestorePage, restorePassword } = require('./nodemailer_middlewares');
const googleAuth = require('./google_auth_middlewares');

module.exports = {
    signUp,
    logIn,
    addToFavourites,
    createAccessToken,
    createRefreshToken,
    authenticateToken,
    authenticateRefreshToken,
    renderRecoveryPage,
    sendRecoveryEmail,
    renderRestorePage,
    restorePassword,
    googleAuth
}