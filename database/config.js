const mongoose = require('mongoose');
const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_CNN,{})

        console.log('Base de datos online')
    } catch (error) {
        throw new Error('Error connecting to Mongoose')
    }
}

module.exports = dbConnection;