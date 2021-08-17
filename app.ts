/**
 * app
 * Created by dcorns on 8/16/21
 * Copyright © 2021 Dale Corns
 */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import addressRouter from './routes/addressRouter';

const app = express();

app.use(cors(
    {
        origin: '*'
    }
));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

app.use('/V1', addressRouter);

app.get('/', (req, res) =>{
    res.send('Welcome to my address API');//replace with usage instructions object
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

export default app;