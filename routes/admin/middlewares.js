import { validationResult } from "express-validator";

export function handleErrors(templateFunc) {
        return (req, res, next) => {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.send(templateFunc({ errors }))
            }

            next();
        };

    }
    export function requireAuth(req, res, next) {
        if(!req.session.userId) {
            return res.redirect('/sign-in')
        }
        next();
    }



