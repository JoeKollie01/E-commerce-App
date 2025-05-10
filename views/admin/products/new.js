import layout from '../layout.js'
import { helpers } from "../../helpers.js";
const { getError} = helpers;

module.exports =  ({ errors}) => {
    return layout({
        content: `
            <form method="POST">
                <input placeholder="Title" name="title"/>
                <input placeholder="Price" name="price" />
                <button>Submit</button>
            </form>
        `
    })
}