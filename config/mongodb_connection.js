require('dotenv').config();

const mongoose = require('mongoose');


const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected...')
    }
    catch (error) {
<<<<<<< HEAD
        console.log(`Unable to connect to MongoDB: ${error}`)
=======
        console.log(`Unable to connect to MongoDB database: ${error}`)
>>>>>>> 3d4b14cb5fc84859a2e0ceaa2509e256b7a4b9fc
    }
}

module.exports = connectMongoDb;