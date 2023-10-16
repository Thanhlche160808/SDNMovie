import Comments from '../model/Comment.model.js';
import ReplyComment from '../model/CommentReply.model.js';
import moment from 'moment/moment.js';

const commentsRepository = {
    addAComments: async (commentInfo) => {
        const dateFormat = Date.parse(moment().format());
        const newComment = await Comments.create(
            {
                content: commentInfo.content,
                author: commentInfo.author,
                movie: commentInfo.movie,
                date: dateFormat,
            }
        );
        return newComment;
    },
    getCommentsByMovie: async (queryString) => {
        const page = queryString.page - 1;
        const count = await Comments.countDocuments({ movie: queryString.movie });
        const totalPage = Math.ceil(count / 5);
        const comments = await Comments.find({ movie: queryString.movie })
            .sort({
                date: -1,
            })
            .limit(5)
            .skip(page * 5);
        return ({
            totalPage, comments
        })
    },
    likeComment: async (commentInfo) => {
        const comment = await Comments.findOne({
            commentID: commentInfo.commentID,
            like: commentInfo.author,
        });
        if (comment) {
            await Comments.updateOne(
                { commentID: commentInfo.commentID, like: commentInfo.author },
                { $pull: { like: commentInfo.author } }
            );
            return true;
        }
        await Comments.updateOne(
            { commentID: commentInfo.commentID },
            { $push: { like: commentInfo.author } }
        );
        return false
    },
    deleteComment: async (commentInfo) => {
        const deletedComment = await Comments.findByIdAndDelete(commentInfo._id);
        return deletedComment
    },
    replyComment: async (req) => {
        const { _id } = req.query;
        const { author, content } = req.body;
        if (!_id) {
            throw new Error("Lack of informations of commentId")
        }
        const newReplyComment = new ReplyComment({
            author,
            content,
            date: new Date().toISOString()
        });
        await newReplyComment.save();
        const comment = await Comments.findById(_id);

        if (!comment) {
            throw new Error('Comment not found');
        }
        comment.replyCommentsId.push(newReplyComment._id);
        await comment.save();
        return newReplyComment;
    },
    updateComment: async (req, res) => {
        const { _id } = req.query;
        const { content } = req.body;
        if (!_id) {
            throw new Error("Lack of commentId information");
        }
        const comment = await Comments.findById(_id);

        if (!comment) {
            throw new Error("Cannot find comment with the provided Id");
        }
        comment.content = content;
        comment.updatedAt = new Date();

        await comment.save();
        return comment;
    },
    reportComment: async (req, res) => {
        const { _id } = req.query;
        if (!_id) {
            throw new Error("Lack of commentId information");
        }
        const comment = await Comments.findById(_id);
        if (!comment) {
            throw new Error("Cannot find comment with the provided Id");
        }
        comment.totalReport += 1;
        if (comment.totalReport > 5) {
            comment.hided = true;
        }
        await comment.save();
        return comment;
    }
}

export default commentsRepository