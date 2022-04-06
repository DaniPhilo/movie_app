const boton = document.querySelectorAll('.input__show');
const saveButton = document.querySelectorAll('.input__save');
const logOutBtn = document.querySelector('#logOutBtn');

// Eventlistener para ir a vista detalle de película:
if (boton != null) {
    Array.from(boton).map((e, i) => {
        e.addEventListener('click', function () {
            const botonID = e.getAttribute('id');
            window.location.href = `/search/${botonID}`
        })
    })
}

// Eventlistener para guardar en favoritos
if (saveButton != null) {
    Array.from(saveButton).map((item) => {
        item.addEventListener('click', async () => {
            const buttonID = item.getAttribute('id');
            try {
                await fetch('http://localhost:3000/movies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ movieID : buttonID })
                })
            }
            catch (error) {
                console.log(error)
            }
        })
    })
}

// Eventlistener para logout:
const logOut = async () => {
    await fetch('http://localhost:3000/logout', {
        method: 'POST'
    });
    window.location.href = 'http://localhost:3000'
}