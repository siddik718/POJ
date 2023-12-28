import { Schema, model } from 'mongoose'
const messageSchema = new Schema({
    conversationId: {
        type: String,
        required: true,
    },
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
    }
},{ timestamps:true })
const MESSAGE = model('messages',messageSchema);
export default MESSAGE;