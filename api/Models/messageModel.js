import { Schema, model } from 'mongoose'
const messageSchema = new Schema({
    sender: {
        type: String,
        required: true,
    },
    receiver : {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    }
},{ timestamps:true })
const MESSAGE = model('messages',messageSchema);
export default MESSAGE;