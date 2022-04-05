const { getFilmsByTitle, getOneFilm } = require('../utils/apiFilms'); //Importamos las funciones de utils


// Controlador de la ruta GET /search/, la cual nos muestra la vista del buscador.
const showBrowserView = (req, res) => {
    res.render('searchView')
}


// Controlador para la ruta POST /search/
const getListOfFilms = async (req, res) => {
    let films = req.body.filmBrowser
    if (films) { // Si la encuentra, devuelve las películas buscadas por título
        try {
            let response = await getFilmsByTitle(films);
            console.log(response);
            res.status(200).render("searchView", { response })
        } catch (err) {
            res.status(400).json({ message: err })
        }
    } else {
        res.status(200).render("searchView")
    }
}

//Controlador para la vista /search/:title
const getSelectedFilm = async (req, res) => {
    let title = req.params.title;
    if (title) {
        try {
            let response = await getOneFilm(title)
            console.log(response);
            let ratings = response.Ratings // En la respuesta viene un array de Ratings, definimos la función
            res.status(200).render("selectedFilm", { response , ratings}) // y se la pasamos al render para pintarla.
        } catch (error) {
            res.status(400).json({ message: err })
        }
    } else {
        res.status(200).render("searchView")
    }
}


// Exportamos los controladores
module.exports = {
    showBrowserView,
    getListOfFilms,
    getSelectedFilm
}