import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import authRouter from './routes/admin/auth.js';
import adminProductsRouter from './routes/admin/products.js';
import productsRouter from './routes/products.js';

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['asdalf;kd']

}));

app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter )


app.listen(8080, () => {
    console.log('Listening on port: 8080');
})