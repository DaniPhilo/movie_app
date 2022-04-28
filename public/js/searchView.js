const boton = document.querySelectorAll('.input__show');
const saveButton = document.querySelectorAll('.input__save');
const deleteButton = document.querySelectorAll('.input__delete');
const logOutBtn = document.querySelector('#logOutBtn');

// Eventlistener para ir a vista detalle de película:
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

        event.target.classList.toggle('fav');
        event.target.setAttribute('onclick', 'removeFromFav(event)');
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

        event.target.classList.toggle('fav');
        event.target.setAttribute('onclick', 'saveFav(event)');
    }
    catch (error) {
        console.log(error)
    }
}
