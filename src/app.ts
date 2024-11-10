
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { notFound } from './middlewares/notFound';

const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Library Management System server is running."
    })
});

app.use(notFound)

export default app;