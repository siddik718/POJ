import mongoose from "mongoose";
import { config } from "dotenv";

config();
const URL = process.env.DBURL;

const connectDB = ()=> {
    mongoose.connect(URL)
        .then(()=>console.log('Database Connected'))
        .catch((err)=>console.log(err));
}

export default connectDB;