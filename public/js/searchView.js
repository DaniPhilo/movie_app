const boton = document.querySelectorAll('.input__show');

if (boton != null) {
    Array.from(boton).map((e, i) => {
        e.addEventListener('click', function () {
            const botonID = e.getAttribute('id');
            window.location.href = `/search/${botonID}`
        })
    })
}