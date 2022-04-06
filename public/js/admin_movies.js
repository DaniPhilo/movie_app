
const goToAddMovie = () => {
    window.location.href = `http://localhost:3000/createMovie`;
}

const toEditMovie = (event) => {
    const titulo = event.target.getAttribute('id');
    window.location.href = `http://localhost:3000/editMovie/${titulo}`;
}

const toDeleteMovie = (event) => {
    const titulo = event.target.getAttribute('id');
    window.location.href = `http://localhost:3000/removeMovie/${titulo}`;
}