import {model,Schema} from 'mongoose';

const contestSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    problems: {
        type: [String],
        required: true,
    }
},{timestamps:true});

const CONTEST = model('contest',contestSchema);
export default CONTEST;
