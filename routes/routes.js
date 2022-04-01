//Rutas para la API
const express = require('express');
const router = express.Router();

const { signUp, logIn, createAccessToken, createRefreshToken, authenticateToken, refreshToken, renderRecoveryPage, sendRecoveryEmail, renderRestorePage, restorePassword } = require('../middleware/main_middlewares');
const { toDashboard, showDashboard, logOut } = require('../controllers/controllers');



// GET
router.get('/', (req,res) => {
    res.render('index', {action: null});
});
router.get('/signup', (req, res) => {
    res.render('index', {action: 'signup'})
});
router.get('/login', (req, res) => {
    res.render('index', {action: 'login'})
});

router.get('/dashboard', authenticateToken, refreshToken, showDashboard);

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
router.post('/signup', signUp, createAccessToken, createRefreshToken, toDashboard);

router.post('/login', logIn, createAccessToken, createRefreshToken, toDashboard);
router.post('/logout', authenticateToken, refreshToken, logOut);
router.post('/createMovie', (req, res) => {
    
});

// PUT
router.put('/editMovie', (req, res) => {

});

// DELETE
router.delete('/removeMovie', (req, res) => {
    
});

// GET's para la recoverpasword y restorepassword
router.route('/recoverpassword').get(renderRecoveryPage).post(sendRecoveryEmail);

router.route('/restorepassword').get(renderRestorePage).post(restorePassword);

module.exports = router;