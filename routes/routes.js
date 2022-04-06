
// Importamos los controladores.
const { showBrowserView, getListOfFilms, getSelectedFilm } = require('../controllers/films');

// Importar autenticación de passport para Google:
const passport = require('passport');
require('../utils/passport_google_auth');

//Rutas para la API
const express = require('express');
const router = express.Router();

const { signUp, logIn, addToFavourites, createAccessToken, createRefreshToken, authenticateToken, authenticateRefreshToken, renderRecoveryPage, sendRecoveryEmail, renderRestorePage, restorePassword, googleAuth } = require('../middleware/main_middlewares');

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
    getMovieDel
} = require('../controllers/controllers');

const { findUserByEmail } = require('../utils/sql_functions');

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

router.route("/createMovie")
    .get(authenticateToken, authenticateRefreshToken, goToMovies)
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
    .get(showBrowserView)
    .post(getListOfFilms);

router.get('/search/:title', getSelectedFilm);


router.route('/movies')
    .get((req, res) => {
        res.render('favourites');
    })
    .post(authenticateToken, authenticateRefreshToken, addToFavourites)


router.post('/signup', signUp, createAccessToken, createRefreshToken, toDashboard);

router.post('/login', logIn, createAccessToken, createRefreshToken, toDashboard);
router.post('/logout', authenticateToken, authenticateRefreshToken, logOut);

router.get('/login/guest',
    async (req, res, next) => {
        const user = await findUserByEmail('guest@guest.com');
        req.user = { user_id: user.user_id };
        return next()
    },
    createAccessToken,
    createRefreshToken,
    (req, res) => {
        res.redirect('/dashboard')
    })
router.get('/login/admin', async (req, res, next) => {
    const user = await findUserByEmail('admin@admin.com');
    req.user = { user_id: user.user_id };
    return next()
},
    createAccessToken,
    createRefreshToken,
    (req, res) => {
        res.redirect('/createMovie')
    });

// GET's para la recoverpasword y restorepassword
router.route('/recoverpassword').get(renderRecoveryPage).post(sendRecoveryEmail);

router.route('/restorepassword').get(renderRestorePage).post(restorePassword);

module.exports = router;