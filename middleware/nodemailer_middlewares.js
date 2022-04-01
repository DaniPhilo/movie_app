require('dotenv').config();

const transporter = require('../utils/nodemailer_config');
const jwt = require('jsonwebtoken');

const { createCookie, deleteCookie } = require('../utils/cookies');
const { createHash } = require('../utils/hashing');
const { findUserByEmail } = require('../utils/sql_functions');
const { AuthenticationError } = require('../errors/errors');

const renderRecoveryPage = (req, res) => {
    res.status(200).render('recover_password');
}

const sendRecoveryEmail = async (req, res, next) => {
    try {
        const email = req.body.email;
        const foundUser = await findUserByEmail(email);
        if (!foundUser) {
            const error = new AuthenticationError('Wrong email');
            next(error)
        }
        const recoveryToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
        createCookie(res, 'recovery_token', recoveryToken);
        const url = `${process.env.URL_RECOVERY_PASSWORD}`;

        await transporter.sendMail({
            to: email,
            subject: 'Recover Password',
            html: `<h3>Recover Password</h3>
            <a href = ${url}>Click here to recover your password</a>
            <p>Link will expire in 10 minutes</p>`
        });
        res.status(200).render('recover_password', { message: 'A recovery email has been sent to your mail direction' })
    }
    catch (error) {
        console.log(error)
    }
}

const renderRestorePage = (req, res) => {
    res.status(200).render('restore_password', { restored_password: false});
}

const restorePassword = async (req, res, next) => {
    const { password, password2 } = req.body;
    const token = req.cookies.recovery_token;
    // We have to validate password!

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) {
                const error = new AuthenticationError('You do not have the required credentials, or theese have expired. Please, try again');
                return next(error);
            }
            const hashedPassword = await createHash(password);
            const dbUser = await findUserByEmail(user.email);
            if (!user) {
                const error = new AuthenticationError('User does not exist. Please, try again');
                return next(error);
            }
            await dbUser.update({ password: hashedPassword })
            await dbUser.save();
            deleteCookie(res, 'recovery_token')
            
            res.status(200).render('restore_password', { restored_password: true})
        });
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    renderRecoveryPage,
    sendRecoveryEmail,
    renderRestorePage,
    restorePassword
}