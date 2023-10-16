import ReplyComment from '../model/CommentReply.model.js';
import moment from 'moment/moment.js';

const commentsReplyRepository = {
    updateComment: async (req, res) => {
        const { _id } = req.query;
        const { content } = req.body;
        if (!_id) {
            throw new Error("Lack of commentId information");
        }
        const comment = await ReplyComment.findById(_id);
        if (!comment) {
            throw new Error("Cannot find comment with the provided Id");
        }
        comment.content = content;
        comment.updatedAt = new Date();

        await comment.save();
        return comment;
    },
}

export default commentsReplyRepository