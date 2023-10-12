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
        const dateFormat = Date.parse(moment().format());
        const { _id } = req.query;
        const { author, content, dateRep } = req.body;
        console.log(_id, content, dateRep, author)
        if (!_id) {
            return res.status(400).json({ error: 'Lack of informations of commentId' });
        }
        const comment = await Comments.findById(_id);
        if (!comment) {
            return res.status(404).json({ error: 'Cannot find comments with Id' });
        }
        const createdReply = await Comments.create({
            author, content, date: Date.now()
        });
        comment.replyComments.push(createdReply);

        await comment.save();

        return createdReply
    }
}

export default commentsRepository