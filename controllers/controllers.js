const logOut = require('../utils/logout');

const toDashboard = (req, res) => {
    res.redirect('/dashboard')
}

const showDashboard = (req, res) => {
    res.render('dashboard')
}

module.exports = {
    toDashboard,
    showDashboard,
    logOut
}