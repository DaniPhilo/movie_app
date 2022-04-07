const logOut = require('../utils/logout');
const Movie = require("../models/Movies")

const toDashboard = (req, res) => {
    res.redirect('/search')
}

const goToMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.render('admin_movies.pug', { movies })
    }
    catch (error) {
        console.log(error)
    }
}

const goToCreateMovie = (req, res, next) => {
    try {
        res.render('createMovie');
    } catch (error) {
        return next(error)
    }
}

const createMovie = async (req, res, next) => {
    try {
        const movie = await new Movie(req.body);
        await movie.save();
        res.render("createMovie", { success: 'Movie saved in database' });
    }
    catch (error) {
        return next(error)
    }

}

async function getMovies(req, res) {
    try {
        const movies = await Movie.find({})
        res.render("editMovie", { movies })
    } catch (error) {
        console.log(error)
    }
}

async function getMovie(req, res) {
    try {
        const titulo = req.params.titulo;
        const movie = await Movie.findOne({ titulo: titulo });
        res.render("editMovie", { movie })
    } catch (err) {
        console.log(err)
    }
}

async function updateMovie(req, res, next) {
    try {
        const newMovie = Movie(req.body);
        //const filter = await Movie.findOne({"titulo":`${newMovie.titulo}`});
        const filter = await Movie.findOne({ "titulo": `${req.params.titulo}` });
        if (!filter) {
            return next(error)
        }
        filter.overwrite(newMovie);
        const movie = await filter.save();
        const success = { message: 'Movie updated' }
        res.status(200).render("editMovie", { movie, success })
    }
    catch (error) {
        return next(error)
    }

}

const getMovieDel = async (req, res, next) => {
    try {
        const movie = await Movie.findOne({ "titulo": `${req.params.titulo}` });
        if (!movie) {
            return next(error);
        }
        res.render("removeMovie", { movie })
    } catch (err) {
        console.log(err)
    }
}

const deleteMovie = async (req, res, next) => {
    try {
        await Movie.findOneAndDelete({ "titulo": `${req.params.titulo}` });
        const success = { message: 'Movie deleted' }
        res.render('removeMovie', { success });
    }
    catch (error) {
        console.log(error);
    }
    
}


module.exports = {
    toDashboard,
    logOut,
    goToCreateMovie,
    goToMovies,
    createMovie,
    getMovies,
    getMovie,
    updateMovie,
    getMovieDel,
    deleteMovie,
}