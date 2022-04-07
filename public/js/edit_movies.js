const botonEliminar = document.querySelectorAll(".botonEliminar");
botonEliminar.forEach(boton=>{
    boton.addEventListener('click', e=>{
        const selected = e.target
        console.log(selected.parentElement.firstChild.id)
        window.location.href = `http://localhost:3000/removeMovie/${selected.parentElement.firstChild.id}`
    })
})

const botonEditar = document.querySelectorAll(".botonEditar");
botonEditar.forEach(boton=>{
    boton.addEventListener('click', e =>{
        const selected = e.target
        window.location.href = `http://localhost:3000/editMovie/${selected.parentElement.firstChild.id}`
    })
})