import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import authRouter from './routes/admin/auth.js';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    keys: ['asdalf;kd']

}));

app.use(authRouter);


app.listen(8080, () => {
    console.log('Listening on port: 8080');
})