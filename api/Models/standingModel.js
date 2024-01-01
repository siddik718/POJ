import {model,Schema} from 'mongoose';
const standingSchema = new Schema({
    contestID: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
        default: 0,
    },
    username : {
        type: String,
        required: true
    }
},{timestamps:true});

const STANDING = model('standing',standingSchema);
export default STANDING;
