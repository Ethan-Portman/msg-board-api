import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const messageModel = mongoose.model('message');
const userModel = mongoose.model('user');

/*
Post Request handler for /users
  - Registers a new user to the database
    - 400 if successful
    - 409 if username already exists
    - 400 for other errors
*/
const addNewUser = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ name: req.body.name }).exec();
        if (existingUser) { return res.status(409).send('Username already exists'); }

        const newUser = await userModel.create(req.body);
        res.status(200).send(newUser);

    } catch (err) { res.status(400).send('Bad Request'); }
};

/*
Post Request handler for /login
  - Verifies a users credentials and sends them an access token
    - 400 if successful
    - 401 for invalid credentials
    - 400 for other errors
  - Upon success, generates a JWT token valid for one hour
*/
const login = async (req, res) => {
    const { name, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ name: name }).exec();
        if (!existingUser || !(await existingUser.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const userRole = existingUser.role || 'user';
        const token = jwt.sign({ userId: existingUser._id, role: userRole }, "NotVerySecure", {
            expiresIn: '1h',
        });
        res.status(200).json({ id: existingUser._id, token: token, role: userRole });

    } catch (error) { res.status(400).send('Bad Request.'); }
};


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


const validateToken = async (req, res) => {
    const { token } = req.body;
    try {
        // Verify the token
        jwt.verify(token, 'NotVerySecure', (err, decoded) => {
            if (err) {
                // Token verification failed
                console.log('Token verification failed:', err);
                return res.status(401).json({ valid: false });
            }

            // Token is valid
            console.log('Token is valid:', decoded);
            res.status(200).json({ valid: true, userId: decoded.userId })
        });
    } catch (error) {
        console.error('Token validation error:', error);
        res.status(500).send('Internal Server Error');
    }
};


export { getAllMessages, addNewMessage, addNewUser, login, validateToken }