const burguer = document.querySelector(".hamburguer");
const navMenu = document.querySelector(".nav__menu");
burguer.addEventListener("click", () => {
    burguer.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav__link").forEach(n => n.addEventListener("click", () => {
    burguer.classList.remove("active");
    navMenu.classList.remove("active");
}))

// Eventlistener para logout:
const logOut = async () => {
    await fetch('http://localhost:3000/logout', {
        method: 'POST'
    });
    window.location.href = 'http://localhost:3000'
}