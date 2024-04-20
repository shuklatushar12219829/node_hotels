const mongooose=require('mongoose');

const mongoURL='mongodb://localhost:27017/hotel';

mongooose.connect(mongoURL)
const db = mongooose.connection;

db.on('connected',()=>{
    console.log('MongoDB connection established');
})
db.on('disconnected',()=>{
    console.log('MongoDB connection disconnected');
})
module.exports = db; 