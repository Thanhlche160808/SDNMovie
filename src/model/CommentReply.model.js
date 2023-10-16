import mongoose from "mongoose";

const ReplyCommentsSchema = new mongoose.Schema({
    author: String,
    content: String,
    date: String,
    updatedAt: {
        type: Date
    }

}, { timestamps: true });

let ReplyComment = mongoose.model("CommentsReply", ReplyCommentsSchema);

export default ReplyComment;