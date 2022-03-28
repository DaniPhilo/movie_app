const { createUser } = require('../utils/sql_functions');

const signUp = async (req, res) => {
    const data = {
        name: req.body['signup-name'],
        email: req.body['signup-email'],
        password: req.body['signup-password']
    }
    try {
        const newUser = await createUser(data);
        console.log(newUser)
        res.end();
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    signUp
}