<<<<<<< HEAD
<<<<<<< HEAD

// Importamos los controladores.
const { showBrowserView, getListOfFilms, getSelectedFilm } = require('../controllers/films');
=======

// Importamos los controladores.
const { showBrowserView, getListOfFilms, getSelectedFilm, getListOfFavourites, getScrapping } = require('../controllers/films');
>>>>>>> 12d3861a7869305b532fca7db2ac444f9ab65642

// Importar autenticación de passport para Google:
const passport = require('passport');
require('../utils/passport_google_auth');

<<<<<<< HEAD
=======
>>>>>>> e07f5492aa0c94c5b45db0f71a16e8b78306eee8
=======
>>>>>>> 12d3861a7869305b532fca7db2ac444f9ab65642
//Rutas para la API
const express = require('express');
const router = express.Router();

<<<<<<< HEAD
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
=======
const { signUp, logIn, addToFavourites, deleteFromFavourites, createAccessToken, createRefreshToken, authenticateToken, authenticateRefreshToken, renderRecoveryPage, sendRecoveryEmail, renderRestorePage, restorePassword, googleAuth } = require('../middleware/main_middlewares');
>>>>>>> 12d3861a7869305b532fca7db2ac444f9ab65642

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
        res.redirect('/createMovie')
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

<<<<<<< HEAD
router.get('/restorepassword', (req, res) => {
    console.log("Vista para restaurar la contraseña");
});
>>>>>>> e07f5492aa0c94c5b45db0f71a16e8b78306eee8
=======
router.route('/restorepassword').get(renderRestorePage).post(restorePassword);
>>>>>>> 12d3861a7869305b532fca7db2ac444f9ab65642

router.post('/logout', authenticateToken, authenticateRefreshToken, logOut);
module.exports = router;