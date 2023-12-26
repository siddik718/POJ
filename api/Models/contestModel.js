import {model,Schema} from 'mongoose';

const contestSchema = new Schema({
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
