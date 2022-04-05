const User = require('./models/users_models');
const { createHash } = require('./utils/hashing');

const createAdmin = async () => {
    const password = await createHash('adminPass1!');
    const user = await User.create({
        name: 'admin',
        email: 'admin@admin.com',
        password: password,
        is_admin: true
    });
    console.log(user, password)
}

const createGuest = async () => {
    const password = await createHash('guestPass1!');
    const user = await User.create({
        name: 'guest',
        email: 'guest@guest.com',
        password: password
    });
    console.log(user, password)
}

createGuest();