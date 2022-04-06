
// Importamos los controladores.
<<<<<<< HEAD
const { showBrowserView, getListOfFilms, getSelectedFilm } = require('../controllers/films');
=======
const { showBrowserView, getListOfFilms, getSelectedFilm, getListOfFavourites, getScrapping } = require('../controllers/films');
>>>>>>> 3d4b14cb5fc84859a2e0ceaa2509e256b7a4b9fc

// Importar autenticación de passport para Google:
const passport = require('passport');
require('../utils/passport_google_auth');

//Rutas para la API
const express = require('express');
const router = express.Router();

<<<<<<< HEAD
const { signUp, logIn, createAccessToken, createRefreshToken, authenticateToken, authenticateRefreshToken, renderRecoveryPage, sendRecoveryEmail, renderRestorePage, restorePassword, googleAuth } = require('../middleware/main_middlewares');

const {
    toDashboard,
=======
const { signUp, logIn, addToFavourites, deleteFromFavourites, createAccessToken, createRefreshToken, authenticateToken, authenticateRefreshToken, renderRecoveryPage, sendRecoveryEmail, renderRestorePage, restorePassword, googleAuth } = require('../middleware/main_middlewares');

const {
    toDashboard,
    showDashboard,
>>>>>>> 3d4b14cb5fc84859a2e0ceaa2509e256b7a4b9fc
    logOut,
    goToMovies,
    createMovie,
    getMovies,
    getMovie,
    updateMovie,
<<<<<<< HEAD
=======
    getMoviesDel,
>>>>>>> 3d4b14cb5fc84859a2e0ceaa2509e256b7a4b9fc
    deleteMovie,
    getMovieDel
} = require('../controllers/controllers');

<<<<<<< HEAD
=======
const { findUserByEmail } = require('../utils/sql_functions');

>>>>>>> 3d4b14cb5fc84859a2e0ceaa2509e256b7a4b9fc
// Rutas de signup / login;
router.get('/', (req, res) => {
    res.render('index', { action: null });
});
router.route('/signup')
    .get((req, res) => {
        res.render('index', { action: 'signup' })
    })
    .post(signUp, createAccessToken, createRefreshToken, toDashboard);

<<<<<<< HEAD
=======
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
        res.redirect('/createMovie')
    });

// Rutas de autenticación con Google:

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
>>>>>>> 3d4b14cb5fc84859a2e0ceaa2509e256b7a4b9fc
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
<<<<<<< HEAD
  .get(authenticateToken, authenticateRefreshToken, showBrowserView)
  .post(authenticateToken, authenticateRefreshToken, getListOfFilms);

router.get('/search/:title', authenticateToken, authenticateRefreshToken, getSelectedFilm);

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
        res.redirect('/createMovie')
    });
=======
    .get(authenticateToken, authenticateRefreshToken, showBrowserView)
    .post(authenticateToken, authenticateRefreshToken, getListOfFilms);

router.route('/search/:title')
    .get(authenticateToken, authenticateRefreshToken, getSelectedFilm)
    .post(getScrapping)


router.route('/movies')
    .get(authenticateToken, authenticateRefreshToken, getListOfFavourites)
    .post(authenticateToken, authenticateRefreshToken, addToFavourites)

router.post('/movies/remove', authenticateToken, authenticateRefreshToken, deleteFromFavourites)




>>>>>>> 3d4b14cb5fc84859a2e0ceaa2509e256b7a4b9fc

// GET's para la recoverpasword y restorepassword
router.route('/recoverpassword').get(renderRecoveryPage).post(sendRecoveryEmail);

router.route('/restorepassword').get(renderRestorePage).post(restorePassword);

router.post('/logout', authenticateToken, authenticateRefreshToken, logOut);
module.exports = router;