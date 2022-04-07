const logOut = require('../utils/logout');
const Movie = require("../models/Movies")
const validacionAdmin = require("../utils/validations")

const toDashboard = (req, res) => {
    res.redirect('/search')
}

const goToMovies = (req, res) => {
    res.render('createMovie')
}

async function createMovie(req,res, next){
    let mov = new Movie(req.body);
    try{
        await validacionAdmin(mov)
        await mov.save()
        .then(item =>{
            res.render("createMovie", {success: 'Movie saved in database'});
        })
    }
    catch(err){
        return next(err)
    }
}

async function getMovies(req, res){
    try{
        const lista = await Movie.find({})
        res.render("editMovie", {lista})
    }catch(error){
        console.log(error)
    }
}

async function getMovieList(req, res){
    const movieList = await Movie.find({})
    res.render("movieList", {movieList})
}

async function getMovie(req, res){
    try{
        const movie = await Movie.findOne({"titulo":`${req.params.titulo}`})
        res.render("editMovie", {movie})
    }catch(err){
        console.log(err)
    }
}

async function updateMovie(req, res){
    const newMovie = Movie(req.body);
    const filter = await Movie.findOne({"titulo":`${req.params.titulo}`});
    console.log(`${req.params.titulo}`)
    filter.overwrite(newMovie);
    await filter.save()
    .then(item=>{
        res.send("document updated")
    })
    .catch(err=>{
        res.send(err)
    })
}

async function getMoviesDel(req, res){
    try{
        const lista = await Movie.find({})
        console.log(lista)
        res.render("removeMovie", {lista})
    }catch(error){
        console.log(error)
    }
}

async function getMovieDel(req, res){
    try{
        const movie = await Movie.findOne({"titulo":`${req.params.titulo}`})
        res.render("removeMovie", {movie})
    }catch(err){
        console.log(err)
    }
}

async function deleteMovie(req, res){
    //const newMovie = Movie(req.body);
    const filter = await Movie.findOne({"titulo":`${req.params.titulo}`})
    console.log(filter)
    Movie.deleteOne(filter)
    .then(item=>{
        res.send("Item deleted")
    })
    .catch(err=>{
        res.send(err)
    })
}


module.exports = {
    toDashboard,
    logOut,
    goToMovies,
    createMovie, 
    getMovies, 
    getMovie, 
    updateMovie, 
    getMoviesDel, 
    deleteMovie, 
    getMovieDel,
    getMovieList
}