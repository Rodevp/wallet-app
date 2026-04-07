import express from 'express';
import type { Response, Request } from 'express';
import AppDataSource from './db';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'server on' });
});

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