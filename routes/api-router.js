import express from 'express';
import { getAllMessages, addNewMessage, addNewUser } from '../controllers/msg-api-controller.js';

const router = express.Router();

router.route('/messages')
    .get(getAllMessages)
    .post(addNewMessage);

router.route('/users')
    .post(addNewUser);

export default router;