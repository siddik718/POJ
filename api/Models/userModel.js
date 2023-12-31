import {Schema, model} from "mongoose";
const userScheama = new Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    }
  },{ timestamps: true }
);
const USER = model("USER", userScheama);
export default USER;