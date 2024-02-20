import express from 'express';
import { getAllMessages, addNewMessage, addNewUser, getAllUsers, login, validateToken } from '../controllers/msg-api-controller.js';

const router = express.Router();

router.route('/messages')
    .get(getAllMessages)
    .post(addNewMessage);

router.route('/users')
    .get(getAllUsers)
    .post(addNewUser);

router.route('/login')
    .get(getAllUsers)
    .post(login);

router.route('/validate-token')
    .post(validateToken);

export default router;