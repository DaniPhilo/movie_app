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
        await fetch('http://localhost:3000/movies', {
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
        await fetch('http://localhost:3000/movies/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movieID: buttonID })
        });

        event.target.setAttribute('class', 'input__save');
        event.target.setAttribute('onclick', 'saveFav(event)');
        event.target.setAttribute('value', 'Save as favourite<3');
    }
    catch (error) {
        console.log(error)
    }
}

// Eventlistener para logout:
const logOut = async () => {
    await fetch('http://localhost:3000/logout', {
        method: 'POST'
    });
    window.location.href = 'http://localhost:3000'
}