import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';

import chatRouter from './routes/chat';

const app = express();

dotenv.config();

// main().catch((err) => console.log(err));

// async function main() {
//     await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || '');
// }

app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => {
    res.json({
        msg: 'Hello World!',
    });
});

app.use('/chat', chatRouter);

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
