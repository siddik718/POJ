import { Schema, model } from "mongoose";
const commentSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  comment:{
    type: String,
    required: true
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'USER',
    required: true
  },
},{timestamps: true});


const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    comments:[commentSchema]
  },
  { timestamps: true }
);
const BLOG = model('BLOG',blogSchema);
export default BLOG;