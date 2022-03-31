const createCookie = (res, name, value) => {
    res.clearCookie(name, {
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.cookie(name, value, {
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
}

const deleteCookies = (res) => {
    res.clearCookie('access_token', {
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.cookie('refresh_token', {
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
}

module.exports = {
    createCookie,
    deleteCookies
}