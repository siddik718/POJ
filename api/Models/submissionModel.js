import { Schema,model } from "mongoose";
const submissionSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    submissionID: {
        type: Number,
        required: true
    },
    problemID: {
        type: Schema.Types.ObjectId,
        ref: 'PROBLEMS',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    sourceCode: {
        type: String,
        required: true
    },
    problemCategory: {
        type: String,
        required: true,
    },
},{timestamps: true});
const SUBMISSIONS = model('SUBMISSIONS',submissionSchema);
export default SUBMISSIONS;