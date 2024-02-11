import mongoose from 'mongoose';

const messageModel = mongoose.model('message');

// GET Request Handler
const getAllMessages = async (req, res) => {
    try {
        let messages = await messageModel.find({}, '', { sort: { _id: -1 } }).exec();
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).send('Bad Request');
    }
};

// POST Request Handler
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

export { getAllMessages, addNewMessage }