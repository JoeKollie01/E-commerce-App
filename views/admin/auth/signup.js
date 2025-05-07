import layout from "../layout.js";

const getError = (errors, prop) => {
 try {
    return errors.mapped()[prop].msg
 } catch (err) {
    return '';
 }
};

const signupTemplate = ({ req, errors }) => {
    return layout({
        content: `
        <!DOCTYPE html>
        <html>
            <head>
            </head>
            <body>
                <div>
                    Your id is: ${req.session.userId}
                    <form method="POST">
                        <input name="email" placeholder="email" />
                        ${getError(errors, 'email')}
                        <input name="password" placeholder="password" />
                         ${getError(errors, 'password')}
                        <input name="passwordConfirmation" placeholder="password confirmation" />
                         ${getError(errors, 'passwordConfirmation')}
                        <button>Sign Up</button>           
                    </form>
        
                </div>
            </body>
        
        </html>      
   `
    }) 
}

export default signupTemplate;