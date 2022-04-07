const {BadRequest} = require('../errors/errors');

const valTitulo = (titulo)=>{
    const regex = /^[\w\.\s]{0,30}$/gi;
    return regex.test(titulo);
}
const valYear = (year)=>{
    const regex = /^[0-9]{4}$/gi;
    return regex.text(year)
}

async function validacion(formulario){
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

module.exports = validacion