<<<<<<< HEAD

// Importamos los controladores.
const { showBrowserView, getListOfFilms, getSelectedFilm } = require('../controllers/films');

// Importar autenticación de passport para Google:
const passport = require('passport');
require('../utils/passport_google_auth');

=======
>>>>>>> e07f5492aa0c94c5b45db0f71a16e8b78306eee8
//Rutas para la API
const express = require('express');
const router = express.Router();

<<<<<<< HEAD
const { signUp, logIn, createAccessToken, createRefreshToken, authenticateToken, authenticateRefreshToken, renderRecoveryPage, sendRecoveryEmail, renderRestorePage, restorePassword, googleAuth } = require('../middleware/main_middlewares');

const {
    toDashboard,
    showDashboard,
    logOut,
    goToMovies,
    createMovie,
    getMovies,
    getMovie,
    updateMovie,
    getMoviesDel,
    deleteMovie,
    getMovieDel,
    getMoviesList
} = require('../controllers/controllers');
const { application } = require('express');

// Rutas de signup / login;
router.get('/', (req, res) => {
    res.render('index', { action: null });
});
router.get('/signup', (req, res) => {
    res.render('index', { action: 'signup' })
});
router.get('/login', (req, res) => {
    res.render('index', { action: 'login' })
});
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    googleAuth,
    createAccessToken,
    createRefreshToken,
    toDashboard
);

// Rutas del admin:
router.get("/movieList", getMoviesList)

router.route("/createMovie")
    .get(/*authenticateToken, authenticateRefreshToken,*/ goToMovies)
    .post(/*authenticateToken, authenticateRefreshToken,*/ createMovie)

router.get("/editMovie", /*authenticateToken, authenticateRefreshToken,*/ getMovies)

router.route('/editMovie/:titulo')
    .get(/*authenticateToken, authenticateRefreshToken,*/ getMovie)
    .post(/*authenticateToken, authenticateRefreshToken,*/ updateMovie)

router.route("/removeMovie/:titulo")
    .get(/*authenticateToken, authenticateRefreshToken,*/ getMovieDel)
    .post(/*authenticateToken, authenticateRefreshToken,*/ deleteMovie)


// Rutas de usuario:

router.route('/search')
  .get(showBrowserView)
  .post(getListOfFilms);

router.get('/search/:title', getSelectedFilm);

router.get('/dashboard', authenticateToken, authenticateRefreshToken, showDashboard);

router.get('/movies', (req, res) => {
    res.render('admin');
});

// POST
router.post('/signup', signUp, createAccessToken, createRefreshToken, toDashboard);

router.post('/login', logIn, createAccessToken, createRefreshToken, toDashboard);
router.post('/logout', authenticateToken, authenticateRefreshToken, logOut);

router.get('/login/guest',
    (req, res, next) => {
        req.user = { user_id: '17571a50-b4d9-11ec-87a7-87d67eb16a0d', email: 'guest@guest.com' };
        return next()
    },
    createAccessToken,
    createRefreshToken,
    (req, res) => {
        res.redirect('/dashboard')
    })
router.get('/login/admin', (req, res, next) => {
    req.user = { user_id: '1726bb80-b4d9-11ec-87a7-87d67eb16a0d', email: 'admin@admin.com' };
    return next()
},
    createAccessToken,
    createRefreshToken,
    (req, res) => {
        res.redirect('/movieList')
    });

// GET's para la recoverpasword y restorepassword
router.route('/recoverpassword').get(renderRecoveryPage).post(sendRecoveryEmail);

router.route('/restorepassword').get(renderRestorePage).post(restorePassword);
=======




// GET
router.get('/', (req,res) => {
    console.log("Hola desde el inicio de la app!");
    //res.render?
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
>>>>>>> e07f5492aa0c94c5b45db0f71a16e8b78306eee8

module.exports = router;