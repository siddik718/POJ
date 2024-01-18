import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import connectDB from './Dbconfig/db.js';
import express, { json, urlencoded } from 'express';

const app = express();
// get the .env values here.
config();
const PORT = process.env.PORT || 5000;

// middlewires.
app.use(cors());
app.use(json());
app.use(morgan("dev"));
app.use(urlencoded({extended:true}));

// database connection.
connectDB();

// Import Routes Here.
import userRoute from './Routes/userRoute.js'
import blogRoute from './Routes/blogRoute.js'
import openaiRoute from './Routes/openaiRoute.js'
import problemRoute from './Routes/problemRoute.js'
import contestRoute from './Routes/contestRoute.js'
import messageRoute from './Routes/messageRoute.js'
import standingRoute from './Routes/standingRoute.js'
import submissionRoute from './Routes/submissionRoute.js'

// urls start here
app.use("/api/user",userRoute);
app.use("/api/blog",blogRoute);
app.use('/api/openai',openaiRoute);
app.use('/api/problem',problemRoute);
app.use('/api/contest',contestRoute);
app.use('/api/message',messageRoute);
app.use('/api/standing',standingRoute);
app.use('/api/submission',submissionRoute);

// server.
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});
