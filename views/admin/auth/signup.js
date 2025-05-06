import layout from "../layout.js";

const signupTemplate = ({ req }) => {
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
                        <input name="password" placeholder="password" />
                        <input name="passwordConfirmation" placeholder="password confirmation" />
                        <button>Sign Up</button>           
                    </form>
        
                </div>
            </body>
        
        </html>      
   `
    }) 
}

export default signupTemplate;