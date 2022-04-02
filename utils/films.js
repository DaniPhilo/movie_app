require('dotenv');
const fetch = require('node-fetch');
const apiKey = process.env.API_KEY;

const getFilmsByTitle = async (title) => {
    try {
        let movieDetails = [];
        let response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${title}`); //{}
        let films = await response.json();
        console.log(films);
        if (films.Response == 'True') {
            for (let i = 0; i < films.Search.length; i++) {
                let response = await fetch(`http://www.omdbapi.com/?i=${films.Search[i].imdbID}&apikey=${apiKey}`)
                let info = await response.json();
                movieDetails.push(info);
                console.log(info);

                /* if (movieDetails.length === films.Search.length) {      en los controllers
                    
                } */
            }
            
            return movieDetails
        }
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        return [];
    }
}


const getFilm = async (id) => {
    try {
        let response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`); //{}
        let film = await response.json(); //{}
        return film;
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        return [];
    }
}

// const get

const films = {
    getFilmsByTitle,
    getFilm
}

module.exports = films