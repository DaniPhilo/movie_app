const imdbID = document.getElementsByClassName('.film__id');
console.log("holaaaaa");

// fetch para coger el id de las listas
const getFilmId = async (id) => {
    try {
        let request = await  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
        let response = await request.json();
        return response
    } catch (error) {
        console.log(error);
    }
}

const getFilmById = async (films) => {
    try {
        let showFilmBtn = document.querySelector('.')
    } catch (error) {
        
    }
}