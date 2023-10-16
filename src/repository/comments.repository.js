import Comments from '../model/Comment.model.js';
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
        const comment = await Comments.findById(_id);
        if (!comment) {
            throw new Error("Cannot find comments with Id")
        }
        const createdReply = {
            author,
            content,
            date: Date.now(),
        };
        comment.replyComments.push(createdReply);
        await comment.save();
        return createdReply
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

        // Update content and updatedAt
        comment.content = content;
        comment.updatedAt = new Date();

        await comment.save();
        return comment;
    }
}

export default commentsRepository