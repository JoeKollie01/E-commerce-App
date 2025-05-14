import { validationResult } from "express-validator";

export function handleErrors(templateFunc, dataCb) {
        return async (req, res, next) => {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                let data = {};
                if(dataCb) {
                 data = await dataCb(req);
                }
                return res.send(templateFunc({ errors, ...data }))
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



