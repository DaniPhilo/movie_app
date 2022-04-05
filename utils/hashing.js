const bcrypt = require('bcrypt');
const { AuthenticationError } = require('../errors/errors');

const createHash = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash
    }
    catch (error) {
        throw new Error('Unable to hash password');
    }
    
}

const checkPassword = async (password, hashedPassword) => {
    try {
        const result = await bcrypt.compare(password, hashedPassword);
        return result
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    createHash,
    checkPassword
}