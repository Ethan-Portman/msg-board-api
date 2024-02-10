import mongoose from "mongoose";

let dbURI = 'mongodb://mongo:27017/messageBoardDB';
mongoose.set('strictQuery', true);
mongoose.connect(dbURI);

// print message to console when connected to DB
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});

// Print error messages with connection issues
mongoose.connection.on('error', (err) => {
    console.log('Mongoose Connection error: ' + err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});