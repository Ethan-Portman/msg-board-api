import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import apiRouter from './routes/api-router.js';

const app = express();

// Define the allowed frontend origins
const allowedOrigins = ['http://localhost:3000', 'http://172.30.71.9:3000'];

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};

// Express middleware
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev'));
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Router (Not in use)
// http://localhost:3004/
app.get('/', (req, res) => {
    res.send('Node.js Server is live!');
});

// Default Router (with API)
// http://localhost:3004/v1/
app.use('/v1', apiRouter);

export default app;
