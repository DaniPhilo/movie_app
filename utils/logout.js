const { deleteCookie } = require('../utils/cookies');
const { findUserById } = require('../utils/sql_functions');

const logOut = async (req, res) => {
    console.log(`From logOut: `+JSON.stringify(req.user.user_id))

    try {
        const user = await findUserById(req.user.user_id);
        console.log(`From logOut: `+JSON.stringify(user))
        user.refresh_token = null;
        await user.save();

        deleteCookie(res, 'access_token');
        deleteCookie(res, 'refresh_token');

        req.logout();
        req.session.destroy();

        res.status(200).end();
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = logOut;