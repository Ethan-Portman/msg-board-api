import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

// GET Request Handler: Get all users: **** Get rid of it eventually
const getAllUsers = async (req, res) => {
    try {
        let users = await userModel.find({}, '', { sort: { _id: -1 } }).exec();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).send('Bad Request');
    }
};

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
};

const login = async (req, res) => {
    const { name, password } = req.body;

    try {
        // Find the user by username
        const existingUser = await userModel.findOne({ name: name }).exec();
        console.log(existingUser);

        // If the user does not exist or the password doesn't match, return an error
        if (!existingUser || !(await existingUser.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        console.log("Generate a token");

        // Generate a JWT token
        const token = jwt.sign({ userId: existingUser._id }, "NotVerySecure", {
            expiresIn: '1h',  // Corrected option name
        });

        // Send the token in the response
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal Server Error');
    }
};


export { getAllMessages, addNewMessage, getAllUsers, addNewUser, login }