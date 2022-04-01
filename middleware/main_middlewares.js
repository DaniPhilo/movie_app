const { signUp, logIn } = require('./sql_middlewares');
const { createAccessToken, createRefreshToken, authenticateToken, refreshToken } = require('./jwt_middlewares');
const { renderRecoveryPage, sendRecoveryEmail, renderRestorePage, restorePassword } = require('./nodemailer_middlewares');

module.exports = {
    signUp,
    logIn,
    createAccessToken,
    createRefreshToken,
    authenticateToken,
    refreshToken,
    renderRecoveryPage,
    sendRecoveryEmail,
    renderRestorePage,
    restorePassword
}