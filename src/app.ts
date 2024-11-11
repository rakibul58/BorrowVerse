
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { notFound } from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Library Management System server is running."
    })
});

// using middleware to check if the route doesn't exists
app.use(notFound)

export default app;