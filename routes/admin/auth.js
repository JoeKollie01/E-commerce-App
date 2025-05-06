import express from 'express';
import { check, validationResult } from 'express-validator';
import usersRepo from "../../repos/users.js";
import signupTemplate from '../../views/admin/auth/signup.js';
import signinTemplate from '../../views/admin/auth/sign-in.js';

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
});



router.post('/signup', [
    check('email')
        .trim()
        .normalizeEmail()
        .isEmail(),
    check('password').trim().isLength({min: 4, max: 20}),
    check('passwordConfirmation').trim().isLength({min: 4, max: 20})
] ,
     async (req, res) => {
        const errors = validationResult(req);
        console.log(errors)
        const {email, password, passwordConfirmation} = req.body;

    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email in use')
    }

    if(password !== passwordConfirmation) {
        return res.send('Passwords must match');
    }
    //Create a user in our user repo to represent this person
    const user = await usersRepo.create({email, password});

    //Store the id of that user inside the users cookie
    req.session.userId = user.id;



    res.send('Account created!!!');
});

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');
})

router.get('/sign-in', (req, res) => {
    res.send(signinTemplate())
});

router.post('/sign-in', async (req, res) => {
    const {email, password} = req.body;

    const user = await usersRepo.getOneBy({email});

    if(!user) {
        return res.send('Email not found');
    }

    const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
    )
    if(!validPassword) {
        return res.send('Invalid password');
    }

    req.session.userId = user.id;

    res.send('You are signed in!!!');
});

export default router;