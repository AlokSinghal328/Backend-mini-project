const mongoose = require('mongoose');
const { DATABASE_NAME } = require('../constants');
const dns  = require('node:dns');

// this is because my internet provider blocked the MONGODB URI in the DNS so i have to use seprate DNS
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.4.8.4']);

const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE_NAME}`);
        console.log("Database Connected Successfully");
    } catch (error){
        console.error("Database Connection Falied, An Error occured", error);
    }
}

module.exports = connectDB;