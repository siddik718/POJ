import axios from 'axios'
import { getStreamingStatementCompletion,getStreamingCodeCompletion } from '../helper/openai.js';
export const summerizeCode = async (req,res) => {
    console.log(req.body)
    try {
        const { userPrompt } = req.body;
        console.log(userPrompt)
        const stream = await getStreamingCodeCompletion({ userPrompt });
        for await (const part of stream) {
            res.write(part.choices[0]?.delta.content || "");
        }
        res.end();
    }catch(err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
export const summerizeStatement = async (req,res) => {
    try {
        const { userPrompt } = req.body;
        const stream = await getStreamingStatementCompletion({ userPrompt });
        for await (const part of stream) {
            res.write(part.choices[0]?.delta.content || "");
        }
        res.end();
    }catch(err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}