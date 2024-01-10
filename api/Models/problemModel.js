import {Schema,model} from 'mongoose';
const problemScema = new Schema({
    username: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    statement: {
        type: String,
        required: true
    },
    sampleInput: {
        type: String,
    },
    sampleOutput: {
        type: String
    },
    input: {
        type: String
    },
    output: {
        type: String,
        required: true
    },
    timeLimit: {
        type : Number,
        required: true
    },
    memoryLimit: {
        type: Number,
        required: true
    },
    selectedTags: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    }
},{ timestamps: true });

const PROBLEMS = model('PROBLEMS',problemScema);
export default PROBLEMS;