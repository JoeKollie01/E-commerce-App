import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import authRouter from './routes/admin/auth.js';
import productRouter from './views/admin/products.js'

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['asdalf;kd']

}));

app.use(authRouter);
app.use(productRouter);


app.listen(8080, () => {
    console.log('Listening on port: 8080');
})