import express from 'express';
import { check, validationResult } from 'express-validator';
import usersRepo from "../../repos/users.js";
import signupTemplate from '../../views/admin/auth/signup.js';
import signinTemplate from '../../views/admin/auth/sign-in.js';
import { requireEmail, requirePassword, requirePasswordConfirmation } from './validators.js';

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
});



router.post('/signup', [

   requireEmail,
   requirePassword,
   requirePasswordConfirmation 
    
] ,
     async (req, res) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.send(signinTemplate({req, errors}));
        }

        const {email, password, passwordConfirmation} = req.body;
        const user = await usersRepo.create({email, password});
        
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