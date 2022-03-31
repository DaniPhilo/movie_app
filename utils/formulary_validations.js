const { BadRequest, AuthenticationError } = require('../errors/errors');
const { checkPassword } = require('./hashing');

const signUpValidations = async (data) => {
    let error = [];
    const name = data.name.match(/^[\w\.\s]{0,20}$/gi) || null;
    if (!name) {
        error.push('name');
    }
    const email = data.email.match(/^[\w\.\-]+@[\w\.\-]+\.[\w]{1,4}$/gi) || null;
    if (!email) {
        error.push('email')
    }
    const password = data.password.match(/^[\w!@#$%€&/()=?¿¡*+;,:.\-_<>\\]{6,50}$/gi) || null;
    const password2 = data.password2;
    if (!password || password.join('') !== password2) {
        error.push('password')
    }
    if (error.length > 0) {
        throw new BadRequest(`Invalid ${error}.`)
    }
}

const loginValidations = async (password, hashedPassword) => {
    try {
        const result = await checkPassword(password, hashedPassword)
        return result
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    signUpValidations,
    loginValidations
}