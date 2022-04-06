const saveButton = document.querySelectorAll('.input__save');

// Eventlistener para guardar en favortos
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