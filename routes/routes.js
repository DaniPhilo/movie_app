
// Importamos los controladores.
const { showBrowserView, getListOfFilms, getSelectedFilm, getListOfFavourites, getScrapping } = require('../controllers/films');

// Importar autenticación de passport para Google:
const passport = require('passport');
require('../utils/passport_google_auth');

//Rutas para la API
const express = require('express');
const router = express.Router();

const { signUp, logIn, addToFavourites, deleteFromFavourites, createAccessToken, createRefreshToken, authenticateToken, authenticateRefreshToken, renderRecoveryPage, sendRecoveryEmail, renderRestorePage, restorePassword, googleAuth } = require('../middleware/main_middlewares');

const {
    toDashboard,
    showDashboard,
    logOut,
    goToCreateMovie,
    goToMovies,
    createMovie,
    getMovies,
    getMovie,
    updateMovie,
    getMovieDel,
    deleteMovie,
} = require('../controllers/controllers');

const { findUserByEmail } = require('../utils/sql_functions');

// Rutas de signup / login;
router.get('/', (req, res) => {
    res.render('index', { action: null });
});
router.route('/signup')
    .get((req, res) => {
        res.render('index', { action: 'signup' })
    })
    .post(signUp, createAccessToken, createRefreshToken, toDashboard);

router.route('/login')
    .get((req, res) => {
        res.render('index', { action: 'login' })
    })
    .post(logIn, createAccessToken, createRefreshToken, toDashboard);


router.get('/login/guest',
    async (req, res, next) => {
        const user = await findUserByEmail('guest@guest.com');
        req.user = { user_id: user.user_id };
        return next()
    },
    createAccessToken,
    createRefreshToken,
    (req, res) => {
        res.redirect('/search')
    })
router.get('/login/admin', async (req, res, next) => {
    const user = await findUserByEmail('admin@admin.com');
    req.user = { user_id: user.user_id };
    return next()
},
    createAccessToken,
    createRefreshToken,
    (req, res) => {
        res.redirect('/admin')
    });

// Rutas de autenticación con Google:

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

router.get("/admin", authenticateToken, authenticateRefreshToken, goToMovies);

router.route("/createMovie")
    .get(authenticateToken, authenticateRefreshToken, goToCreateMovie)
    .post(authenticateToken, authenticateRefreshToken, createMovie)

router.get("/editMovie", authenticateToken, authenticateRefreshToken, getMovies)

router.route('/editMovie/:titulo')
    .get(authenticateToken, authenticateRefreshToken, getMovie)
    .post(authenticateToken, authenticateRefreshToken, updateMovie)

router.route("/removeMovie/:titulo")
    .get(authenticateToken, authenticateRefreshToken, getMovieDel)
    .post(authenticateToken, authenticateRefreshToken, deleteMovie)


// Rutas de usuario:

router.route('/search')
    .get(authenticateToken, authenticateRefreshToken, showBrowserView)
    .post(authenticateToken, authenticateRefreshToken, getListOfFilms);

router.route('/search/:title')
    .get(authenticateToken, authenticateRefreshToken, getSelectedFilm)
    .post(getScrapping)


router.route('/movies')
    .get(authenticateToken, authenticateRefreshToken, getListOfFavourites)
    .post(authenticateToken, authenticateRefreshToken, addToFavourites)

router.post('/movies/remove', authenticateToken, authenticateRefreshToken, deleteFromFavourites)





// GET's para la recoverpasword y restorepassword
router.route('/recoverpassword').get(renderRecoveryPage).post(sendRecoveryEmail);

router.route('/restorepassword').get(renderRestorePage).post(restorePassword);

router.post('/logout', authenticateToken, authenticateRefreshToken, logOut);
module.exports = router;