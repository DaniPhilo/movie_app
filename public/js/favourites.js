// Eventlistener para ir a vista de talle de película:
const goToMovie = async (event) => {
    const botonID = event.target.getAttribute('id');
    window.location.href = `/search/${botonID}`
}

// Eventlistener para guardar en favoritos:
const saveFav = async (event) => {
    const buttonID = event.target.getAttribute('id');
    try {
        await fetch('/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movieID: buttonID })
        });

        event.target.setAttribute('class', 'input__delete');
        event.target.setAttribute('onclick', 'removeFromFav(event)');
        event.target.setAttribute('value', 'Saved');
    }
    catch (error) {
        console.log(error)
    }
}

// Eventlistener para borrar de favoritos
const removeFromFav = async (event) => {
    const buttonID = event.target.getAttribute('id');
    try {
        await fetch('/movies/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movieID: buttonID })
        });

        const div = event.target.parentElement.parentElement;
        div.remove();
    }
    catch (error) {
        console.log(error)
    }
}
