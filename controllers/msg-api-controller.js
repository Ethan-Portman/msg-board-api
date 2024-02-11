import mongoose from 'mongoose';

const messageModel = mongoose.model('message');

// let messages = [
//     { id: 0, name: "Bob", msgText: "Hello there" },
//     { id: 1, name: "Joe", msgText: "Hey" },
//     { id: 2, name: "Bob", msgText: "How are you?" }
// ]

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
        let message = await messageSchema.validate(req.body);
        message.id = messages.length
        messages.unshift(message);
        res.status(200).send(message);
    } catch (err) {
        res
            .status(400)
            .send('Bad Request. The message in the body of the \
            Request is either missing or malformed.');
    }
};

export { getAllMessages, addNewMessage }