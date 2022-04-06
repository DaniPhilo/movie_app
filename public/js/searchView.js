const boton = document.querySelectorAll('.input__show');
const saveButton = document.querySelectorAll('.input__save');

if (boton != null) {
    Array.from(boton).map((e, i) => {
        e.addEventListener('click', function () {
            const botonID = e.getAttribute('id');
            window.location.href = `/search/${botonID}`
        })
    })
}
if (saveButton != null) {
    Array.from(saveButton).map((item) => {
        item.addEventListener('click', async () => {
            console.log('event triggered')
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