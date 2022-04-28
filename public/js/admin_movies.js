const goToAddMovie = () => {
    window.location.href = `/createMovie`;
}

const toEditMovie = (event) => {
    const titulo = event.target.getAttribute('id');
    window.location.href = `/editMovie/${titulo}`;
}

const toDeleteMovie = (event) => {
    const titulo = event.target.getAttribute('id');
    window.location.href = `/removeMovie/${titulo}`;
}

