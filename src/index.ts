import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { doubleCsrf } from 'csrf-csrf'

import type { Response, Request } from 'express';
import { errorHandler } from './middlewares/errors';

import AppDataSource from './db';
import { AppError } from './error';
import { HTTP_STATUS } from './types';

const allowedOrigins = [
    'http://localhost:3000',
]

const PORT = process.env.PORT || 3000;
const app = express();
const { doubleCsrfProtection } = doubleCsrf({
    getSecret: () => 'secret',
    cookieName: 'x-csrf-token',
    cookieOptions: {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
    },
    getSessionIdentifier: (req: Request) => req.ip!,
});

app.use(express.json({ limit: '10kb' }));
app.use(helmet());
app.use(doubleCsrfProtection);
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new AppError('Not allowed by CORS', HTTP_STATUS.FORBIDDEN));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
}));

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'server on' });
});

app.use(errorHandler);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

app.listen(PORT, () => {
    console.log('server on port ', + PORT);
});