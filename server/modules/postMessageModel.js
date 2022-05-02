import mongoose from "mongoose";
import User from "./userModel.js";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creatorId: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage
