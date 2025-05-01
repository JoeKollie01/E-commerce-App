import express from 'express';
import bodyParser from 'body-parser';
import usersRepo from './repos/users.js';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passwordConfirmation" placeholder="password confirmation" />
                <button>Sign Up</button>           
            </form>
        
        </div>
        `);
});



app.post('/', async (req, res) => {
    const {email, password, passwordConfirmation} = req.body;

    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email in use')
    }

    res.send('Account created!!!');
})


app.listen(8080, () => {
    console.log('Listening on port: 8080');
})