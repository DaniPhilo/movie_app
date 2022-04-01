const { deleteCookie } = require('../utils/cookies');
const { findUserById } = require('../utils/sql_functions');

const logOut = async (req, res) => {
    try {
        const user = await findUserById(req.user.user_id);
        await user.update({ refresh_token: null });
        await user.save();

        deleteCookie(res, 'access_token');
        deleteCookie(res, 'refresh_token');

        res.status(200).end();
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = logOut;