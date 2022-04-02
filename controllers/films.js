const films = require('../utils/films');

const getFilmsByTitle = async (req, res) => {
    if (req.params.title) { // Si la encuentra, devuelve las películas buscadas por título
        try {
            let response = await films.getFilmsByTitle(req.params.title);
            /* let littleInfo = response[0];
            let bigInfo = response[1]; */
            /* console.log(response.Search[0]); */
            console.log(response);
            /* res.status(200).render("searchView", {littleInfo}) */ // film.imdbID hace alusión al film of searchedFilms del pug
            res.status(200).render("searchView", {response})
        } catch (err) {
            res.status(400).json({message:err})
        }
    } else {
        res.status(200).render("searchView")
    }
}

const redirectToList = async (req, res) => {
    let films = req.body.filmBrowser
    res.redirect(`http://localhost:3000/search/${films}`)
}

const getFilm = async (req, res) => {
    if (req.params.id) {
        try {
            const response = await films.getFilm(req.params.id);
            res.render('searchView', { searchedFilm: response })
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    }
}

    const film = {
        getFilmsByTitle,
        redirectToList,
        getFilm
    }

    module.exports = film;