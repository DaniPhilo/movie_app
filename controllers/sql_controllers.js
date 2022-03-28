const { createUser } = require('../utils/sql_functions');
const { signUpValidations } = require('../utils/formulary_validations');

const signUp = async (req, res) => {
    const data = {
        name: req.body['signup-name'],
        email: req.body['signup-email'],
        password: req.body['signup-password'],
        password2: req.body['signup-password2']
    }
    try {
        await signUpValidations(data);
        const newUser = await createUser(data);
        res.send(newUser);
    }
    catch(error) {
        console.log(error);
        res.end();
    }
}

module.exports = {
    signUp
}