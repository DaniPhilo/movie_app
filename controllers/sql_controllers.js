const { createUser } = require('../utils/sql_functions');

const signUp = async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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