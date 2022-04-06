const saveButton = document.querySelectorAll('.input__save');

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