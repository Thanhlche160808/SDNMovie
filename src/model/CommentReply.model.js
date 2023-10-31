import mongoose from "mongoose";

const ReplyCommentsSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: String,
    updatedAt: {
        type: Date
    }

}, { timestamps: true });

let ReplyComment = mongoose.model("CommentsReply", ReplyCommentsSchema);

export default ReplyComment;