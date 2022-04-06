const editarPeliculas = document.querySelector(".editarPeliculas");
if(editarPeliculas){
    editarPeliculas.addEventListener('click', ()=>{
        window.location.href = "http://localhost:3000/editMovie/"
    })}

const nuevaPeli = document.querySelector(".nuevaPeli")
if(nuevaPeli){
    nuevaPeli.addEventListener('click', () =>{
        window.location.href = "http://localhost:3000/createMovie/"
    })
}

const botonEliminar = document.querySelectorAll(".botonEliminar");
botonEliminar.forEach(boton=>{
    boton.addEventListener('click', e=>{
        const selected = e.target
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