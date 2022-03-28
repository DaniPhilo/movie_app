//Rutas para la API
const express = require('express');
const router = express.Router();

const { signUp } = require('../controllers/sql_controllers');



// GET
router.get('/', (req,res) => {
    res.render('index', {signup: false, login: false});
});
router.get('/signup', (req, res) => {
    res.render('index', {signup: true, login: false})
});
router.get('/login', (req, res) => {
    res.render('index', {signup: false, login: true})
});

router.get('/dashboard', (req,res) => {
    console.log("Hola desde el panel de control de la app!");
    //res.render?
});

router.get('/search/:title', (req,res) => {
    console.log("Aquí tienes tu película.");
    //res.render?
});

router.get('/search', (req,res) => {
    console.log("Hola desde el buscador de la app!");
    //res.render?
});

router.get('/movies', (req,res) => {
    console.log("Aquí tienes tus películas favoritas.");
    //res.render?
});

// POST
router.post('/signup', signUp);

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