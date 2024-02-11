import express from 'express';
import { getAllMessages, addNewMessage, addNewUser, getAllUsers } from '../controllers/msg-api-controller.js';

const router = express.Router();

router.route('/messages')
    .get(getAllMessages)
    .post(addNewMessage);

router.route('/users')
    .get(getAllUsers)
    .post(addNewUser);

export default router;