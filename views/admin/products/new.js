import layout from '../layout.js'
import { helpers } from "../../helpers.js";
const { getError} = helpers;

export default  ({ errors}) => {
    return layout({
        content: `
            <form method="POST" enctype="multipart/form-data">
                <input placeholder="Title" name="title"/>
                <input placeholder="Price" name="price" />
                <input type="file" name="image" />
                <button>Submit</button>
            </form>
        `
    })
}