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
    replyComments: [
        {
            author: String,
            content: String,
            date: String,
        },
    ],
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
});

let Comments = mongoose.model("Comments", CommentsSchema);

export default Comments;