import mongoose from 'mongoose';

const messageModel = mongoose.model('message');
const userModel = mongoose.model('user');

// GET Request Handler: Get all messages
const getAllMessages = async (req, res) => {
    try {
        let messages = await messageModel.find({}, '', { sort: { _id: -1 } }).exec();
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).send('Bad Request');
    }
};

// POST Request Handler: Add a new message
const addNewMessage = async (req, res) => {
    try {
        let message = await messageModel.create(req.body);
        res.status(200).send(message);
    } catch (err) {
        res
            .status(400)
            .send('Bad Request. The message in the body of the \
            Request is either missing or malformed.');
    }
};

// GET Request Handler: Get all users
const getAllUsers = async (req, res) => {
    try {
        let users = await userModel.find({}, '', { sort: { _id: -1 } }).exec();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).send('Bad Request');
    }
}

// POST Request Handler: Add a new user
const addNewUser = async (req, res) => {
    try {
        // Check if username already exists
        const existingUser = await userModel.findOne({ name: req.body.name }).exec();

        if (existingUser) {
            return res.status(400).send('Username already exists. Please choose a different username.');
        }

        let user = await userModel.create(req.body);
        res.status(200).send(user);
    } catch (err) {
        res
            .status(400)
            .send('Bad Request. The message in the body of the \
            Request is either missing or malformed.');
    }
}


export { getAllMessages, addNewMessage, getAllUsers, addNewUser }