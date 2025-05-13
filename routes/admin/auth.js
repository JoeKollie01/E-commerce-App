import express from 'express';

import { handleErrors} from './middlewares.js'
import usersRepo from "../../repos/users.js";
import signupTemplate from '../../views/admin/auth/signup.js';
import signinTemplate from '../../views/admin/auth/sign-in.js';
import { 
    requireEmail, 
    requirePassword, 
    requirePasswordConfirmation,
    requireEmailExists,
    requireValidPasswordForUser

} from './validators.js';

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
});



router.post('/signup', [

   requireEmail,
   requirePassword,
   requirePasswordConfirmation 
    
] ,
    handleErrors(signupTemplate),
     async (req, res) => {
     
       const {email, password} = req.body;
       const user = await usersRepo.create({email, password});
        
        req.session.userId = user.id;
        res.redirect('/admin/products');
});

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');
})

router.get('/sign-in', (req, res) => {
    res.send(signinTemplate({}))
});

router.post('/sign-in', [
    requireEmailExists,
    requireValidPasswordForUser
   
], 
    handleErrors(signinTemplate),
    async (req, res) => {

    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });


    req.session.userId = user.id;

    res.redirect('/admin/products');
});

export default router;