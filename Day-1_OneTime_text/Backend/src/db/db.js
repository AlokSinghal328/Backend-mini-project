const mongoose = require('mongoose');
const { DATABASE_NAME } = require('../constants');

const connetDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE_NAME}`);
        console.log("Database Connected Successfully");
    } catch (error){
        console.error("/n Database Connection Falied, An Error occured /n /n", error);
    }
}

module.exports = connectDB;