const { createUser, findUserByEmail } = require('./utils/sql_functions');
const { createHash } = require('./utils/hashing');

// const init = async () => {
//     const adminPass = await createHash('adminPass0!');
//     const guestPass = await createHash('guestPass0!');

//     const admin = {
//         name: 'admin',
//         email: 'admin@admin.com',
//         password: adminPass
//     }
//     const guest = {
//         name: 'guest',
//         email: 'guest@guest.com',
//         password: guestPass
//     }

//     const newAdmin = await createUser(admin);
//     const newGuest = await createUser(guest);

//     console.log(newAdmin)
//     console.log(newGuest)
// }

const init = async () => {
    const admin = await findUserByEmail('admin@admin.com');

    admin.is_admin = true;
    await admin.save();
}
