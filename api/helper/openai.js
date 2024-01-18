import OpenAI from "openai";
import { config } from 'dotenv';
config();
const apiKey = process.env.OPENAI_KEY;
// console.log('ApiKey : ',apiKey);
const client = new OpenAI({ apiKey });
const systemMessageToSummerizeCode = {
  role: "system",
  content: "You are an expert in programming.So,you will be given a code.Your first task will be to read the whole code first and find if there are any errors, like a syntax error, an array out of bounds, or a division by zero.If there is any error, then specify where the error is and what the error is.Otherwise,Remove every unnecessary part of the code to make it more readable.You can take your time to make a clean code. Also, if any specific algorithm is used, then say something about it and give some resources on that algorithm. If no specific algorithm is used, then say nothing."
};
const systemMessageToSummerizeStatement = {
  role: "system",
  content: "You are a teacher who teaches programming in school, and you will be given a programming problem. You have to read the whole problem first.Then produce an explanation for the given problem. Remember, you won't give the solution to the given problem, like an approach or code to solve the problem, but only a simplified version of the given problem with the algorithms, data structures, or some basic programming topics that one might need to know before solving this problem in both optimal and brute force. At last, give the user some online resource links to learn about those topics.Remember to keep your answer in short."
};
export const getStreamingCodeCompletion = async ({ userPrompt }) => {
  return client.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [systemMessageToSummerizeCode, { role: "user", content: userPrompt }],
    stream: true,
    max_tokens: 500,
    temperature: 0,
  });
};
export const getStreamingStatementCompletion = async ({ userPrompt }) => {
  return client.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [systemMessageToSummerizeStatement, { role: "user", content: userPrompt }],
    stream: true,
    max_tokens: 500,
    temperature: 0,
  });
};