import mongoose from "mongoose";

const CommentsSchema = mongoose.Schema({
    commentID: {
        type: mongoose.Schema.Types.ObjectId,
    },
    content: {
        type: String,
        require: true,
    },
    author: String,
    movie: {
        type: mongoose.Schema.Types.ObjectId,
    },
    replyComments: [
        {
            author: String,
            content: String,
            dateRep: String,
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
});

let Comments = mongoose.model("Comments", CommentsSchema);

export default Comments;