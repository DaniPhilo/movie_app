const BadRequest = require('../errors/errors');
async function validacion(formulario){
    let errores = [];
    if(formulario.titulo=="" || !formulario.titulo){
        errores.push("Titulo")
    }
    if(formulario.year=="" || !formulario.year){
        errores.push("Año")
    }
    if(formulario.director=="" || !formulario.director){
        errores.push("Director")
    }
    if(formulario.genero=="" || !formulario.genero){
        errores.push("Genero")
    }
    if(formulario.duracion=="" || !formulario.duracion){
        errores.push("Duración")
    }
    if(formulario.imagen=="" || !formulario.imagen){
        errores.push("Imagen")
    }
    if (errores.length > 0) {
        throw new BadRequest(`${errores} invalido.`)
    }
}

module.exports = validacion