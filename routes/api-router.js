import express from 'express';
import { getAllMessages, addNewMessage, addNewUser, login, validateToken } from '../controllers/msg-api-controller.js';

const router = express.Router();

router.route('/messages')
    .get(getAllMessages)
    .post(addNewMessage);

router.route('/users')
    .post(addNewUser);

router.route('/login')
    .post(login);

router.route('/validate-token')
    .post(validateToken);

export default router;