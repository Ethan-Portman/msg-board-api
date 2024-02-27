// import './db.js'; // mongodb connection via mongoose
// import express from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import cookieParser from 'cookie-parser';
// import compression from 'compression';
// import morgan from 'morgan';
// import cors from 'cors';
// import helmet from 'helmet';
// import apiRouter from './routes/api-router.js';

// const app = express();
// const httpServer = createServer(app);

// // Specify a custom path for the Socket.io server
// const io = new Server(httpServer, {
//     path: '/socket.io',
// });

// app.use(express.json());
// app.use(helmet());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(compression());
// app.use(morgan('dev'));
// app.use(cors());

// io.on('connection', (socket) => {
//     console.log('a user connected');

//     // Handle WebSocket events here
//     socket.on('message', (message) => {
//         console.log('Received message:', message);
//         // Broadcast the message to all connected clients
//         io.emit('message', message);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });

// // Router (Not in use)
// // http://localhost:3004/
// app.get('/', (req, res) => {
//     res.send('Node.js Server is live!');
// });

// app.use('/v1', apiRouter);

// // Use the same httpServer instance for both HTTP and WebSocket
// // const PORT = process.env.PORT || 3004;
// // httpServer.listen(PORT, () => {
// //     console.log(`Server is running on http://localhost:${PORT}`);
// // });

// export default app;
