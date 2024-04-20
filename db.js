const mongooose=require('mongoose');
require('dotenv').config();
// const mongoURL='process.env.DB_URL_LOCAL';
const mongoURL=process.env.DB_URL;
mongooose.connect(mongoURL)
const db = mongooose.connection;

db.on('connected',()=>{
    console.log('MongoDB connection established');
})
db.on('disconnected',()=>{
    console.log('MongoDB connection disconnected');
})
module.exports = db; 