// Dependencias
const express = require('express');
const router = express.Router();

// Importamos los controladores.
const {
    showBrowserView,
    getListOfFilms,
    getSelectedFilm
} = require('../controllers/films');


// RUTAS PARA LA APP
// GET
router.get('/', (req,res) => {
    console.log("Hola desde el inicio de la app!");
    //res.render?
});

router.get('/dashboard', (req,res) => {
    console.log("Hola desde el panel de control de la app!");
    //res.render?
});




/*************************************************************************/



router.get('/search', showBrowserView);
router.post('/search', getListOfFilms);
router.get('/search/:title', getSelectedFilm);



/*************************************************************************/





router.get('/movies', (req,res) => {
    console.log("Aquí tienes tus películas favoritas.");
    //res.render?
});

// POST
router.post('/signup', (req, res) => {
    
});
router.post('/login', (req, res) => {
    
});
router.post('/logout', (req, res) => {
    
});
router.post('/createMovie', (req, res) => {
    
});

// PUT
router.put('/editMovie', (req, res) => {

});

// DELETE
router.delete('/removeMovie', (req, res) => {
    
});

// GET's para la recoverpasword y restorepassword
router.get('/recoverpassword', (req, res) => {
    console.log("Vista para recuperar la contraseña");
});

router.get('/restorepassword', (req, res) => {
    console.log("Vista para restaurar la contraseña");
});

module.exports = router;