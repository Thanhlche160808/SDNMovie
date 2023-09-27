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

export default {
    addACommentsService
}