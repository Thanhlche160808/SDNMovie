import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
    commentID: {
        type: mongoose.Schema.Types.ObjectId,
    },
    content: {
        type: String,
    },
    author: String,
    movie: {
        type: mongoose.Schema.Types.ObjectId,
    },
    replyCommentsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommentsReply",
    },],
    date: String,
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
        },
    ],
    dislike: [
        {
            type: mongoose.Schema.Types.ObjectId,
        },
    ],
    totalReport: {
        type: Number,
        default: 0,
    },
    hided: {
        type: Boolean,
        default: false,
    },
    updatedAt: {
        type: Date
    }

}, { timestamps: true });

let Comments = mongoose.model("Comments", CommentsSchema);

export default Comments;