import mongoose from 'mongoose';

// Connect to locally running MongoDB Instance
let dbURI = 'mongodb://localhost:27017/msgs_db';
mongoose.set('strictQuery', true);
mongoose.connect(dbURI);

// Print message to console when connectted to DB
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});

// Print error message to console if there is error connecting
mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

import './models/message-schema.js';
import './models/user-schema.js';