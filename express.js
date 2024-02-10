import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import apiRouter from './routes/api-router.js';

const app = express();

// Express middleware
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());

// Router (Not in use)
// http://localhost:3004/
app.get('/', (req, res) => {
    res.send('Node.js Server is live!');
});

// Default Router (with API)
// http://localhost:3004/v1/
app.use('/v1', apiRouter);

export default app;