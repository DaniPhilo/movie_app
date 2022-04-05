require('dotenv').config();

const mongoose = require('mongoose');


const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected...')
    }
    catch (error) {
        console.log(`Unable to connect to MongoDB: ${error}`)
    }
}

module.exports = connectMongoDb;