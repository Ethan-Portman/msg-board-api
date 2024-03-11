import express from 'express';
import { getAllMessages, addNewMessage, addNewUser, login, validateToken, getIdFromName, getAllUsers } from '../controllers/msg-api-controller.js';

const router = express.Router();

router.route('/messages')
    .get(getAllMessages)
    .post(addNewMessage);

router.route('/users')
    .get(getAllUsers)
    .post(addNewUser);

router.route('/login')
    .post(login);

router.route('/validate-token')
    .post(validateToken);

router.route('/getIdFromName')
    .get(getIdFromName);

export default router;