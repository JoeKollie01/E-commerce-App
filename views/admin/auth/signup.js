import layout from "../layout.js";
import { helpers } from "../../helpers.js";
const { getError} = helpers;

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
                         <div style="color: red;">${getError(errors, 'password')}</div>
                        <input name="passwordConfirmation" placeholder="password confirmation" />
                          <div style="color: red;">${getError(errors, 'passwordConfirmation')}</div>
                        <button>Sign Up</button>           
                    </form>
        
                </div>
            </body>
        
        </html>      
   `
    }) 
}

export default signupTemplate;