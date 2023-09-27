import Comments from '../model/Comment.model.js';
import moment from 'moment/moment.js';

const addACommentsService = async (commentInfo) => {
    try {
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
    } catch (error) {
        return null;
    }
}

const getCommentsByMovieService = async (queryString) => {
    try {
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
    } catch (error) {
        return null;
    }
}

const likeCommentService = async (commentInfo) => {
    try {
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
    } catch (error) {
        return null;
    }
}

export default {
    addACommentsService, getCommentsByMovieService, likeCommentService
}