import { Schema, model } from 'mongoose'
const conversationSchema = new Schema({
    me: {
        type: String,
        required: true,
    },
    friend: {
        type: String,
        required: true,
    }
},{ timestamps: true })
const CONVERSATION = model('conversations',conversationSchema);
export default CONVERSATION;