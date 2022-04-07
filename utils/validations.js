const { BadRequest, AuthenticationError } = require('../errors/errors');
const { checkPassword } = require('./hashing');

const valTitulo = (titulo)=>{
    const regex = /^[\w\.\s]{0,30}$/gi;
    return regex.test(titulo);
}
const valYear = (year)=>{
    const regex = /^[0-9]{4}$/gi;
    return regex.text(year)
}

async function validacionAdmin(formulario){
    let errores = [];

    if(valTitulo(formulario.titulo)=="" || !formulario.titulo){
        errores.push("Titulo")
    }
    if(valYear(formulario.year)=="" || !formulario.year){
         errores.push("Año")
        }
    if(valTitulo(formulario.director)=="" || !formulario.director){
        errores.push("Director")
        }
    if(valTitulo(formulario.genero)=="" || !formulario.genero){
        errores.push("Genero")
        }
    if(formulario.duracion=="" || !formulario.duracion){
        errores.push("Duración")
        }
    if(valTitulo(formulario.imagen)=="" || !formulario.imagen){
        errores.push("Imagen")
        }
    if (errores.length > 0) {
        throw new BadRequest(`${errores} invalido.`, "invalid movie")
        }
}

const validateName = (name) => {
    const regex = /^[\w\.\s]{0,20}$/gi;
    return regex.test(name);
}

const validateEmail= (email) => {
    const regex = /^[\w\.\-]+@[\w\.\-]+\.[\w]{1,4}$/gi;
    return regex.test(email);
}

const validatePassword = (password) => {
    const regex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.:\-_,;+*/\\=])[A-Za-z\d@$!%*?&.:\-_,;+*/\\=]{8,50}$/g;
    return regex.test(password);
}

const signUpValidations = async (data) => {
    let errors = [];
    if(!validateName(data.name) || data.name === '') {errors.push('name')}
    if(!validateEmail(data.email)) {errors.push('email')}
    if(!validatePassword(data.password) || data.password !== data.password2) {errors.push('password')}
    if (errors.length > 0) {
        throw new BadRequest(`Invalid ${errors}.`, 'signup')
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

const validateRecoveryPassword = (password, password2) => {
    let errors = [];
    if(!validatePassword(password) || password !== password2) {errors.push('password')}
    if (errors.length > 0) {
        return false
    }
    return true
}

module.exports = {
    signUpValidations,
    loginValidations,
    validateRecoveryPassword,
    validacionAdmin
}