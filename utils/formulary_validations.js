const { BadRequest } = require('../errors/errors');

const signUpValidations = async (data) => {
    let error = [];
    const name = data.name.match(/^[\w\.\s]{0,20}$/gi);
    if (!name) {
        error.push('name');
    }
    const email = data.email.match(/^[\w\.\-]+@[\w\.\-]+\.[\w]{1,4}$/gi);
    if (!email) {
        error.push('email')
    }
    const password = data.password.match(/^[\w!@#$%€&/()=?¿¡*+;,:.\-_<>\\]{6,50}$/gi);
    const password2 = data.password2;
    if (!password || password.join('') !== password2) {
        error.push('password')
    }
    if (error.length > 0) {
        throw new BadRequest(`Invalid ${error}.`)
    }
}

module.exports = {
    signUpValidations
}