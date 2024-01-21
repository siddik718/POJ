import OpenAI from "openai";
import { config } from 'dotenv';
config();
const apiKey = process.env.OPENAI_KEY;
// console.log('ApiKey : ',apiKey);
const client = new OpenAI({ apiKey });
const systemMessageToSummerizeCode = {
  role: "system",
  content: "You will be given a code snippet delimited by triple backticks.First Read the whole code first, then remove all unused part of the code and simplify the new code.You can take your time to create a good readable code."
};
const systemMessageToSummerizeStatement = {
  role: "system",
  content: "You are a teacher who teaches programming in school, and you will be given a programming problem. You have to read the whole problem first.Then produce an explanation for the given problem. Remember, you won't give the solution to the given problem, like an approach or code to solve the problem, but only a simplified version of the given problem with the algorithms, data structures, or some basic programming topics that one might need to know before solving this problem in both optimal and brute force. At last, give the user some online resource links to learn about those topics.Remember to keep your answer in short."
};
const systemMessageToSummerizeBlog = {
  role: "system",
  content: "You are an analyst. You will be given a blog post.You have to analyze the whole blog post first, then give a good summary of the blog post.You can take your time to produce a good summary. Also, find the keywords that are frequently used in the blog post."
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

export const getStreamingBlogCompletion = async ({ userPrompt }) => {
  return client.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [systemMessageToSummerizeBlog, { role: "user", content: userPrompt }],
    stream: true,
    max_tokens: 500,
    temperature: 0,
  });
};