import express from 'express';
import type { Response, Request } from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'server on' });
});

app.listen(PORT, () => {
    console.log('server on port ', + PORT);
});