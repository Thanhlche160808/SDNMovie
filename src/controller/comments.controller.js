import { commentsRepository } from "../repository/index.js"

const commentController = {
    addAComments: async (req, res) => {
        try {
            const newComment = await commentsRepository.addAComments(req.body);
            return res.status(200).json({
                message: 'Add comments successfully!!!',
                data: newComment
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Can not add comments!!!',
            });
        }
    },
    getCommentsByMovie: async (req, res) => {
        try {
            const result = await commentsRepository.getCommentsByMovie(req.query);
            return res.status(200).json({
                message: 'Get comments successfully!!!',
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Can not get comments by movie!!!',
            });
        }
    },
    likeComment: async (req, res) => {
        try {
            const result = await commentsRepository.likeComment(req.body)
            return res.status(200).json({ status: result });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    deleteComment: async (req, res) => {
        try {
            const result = await commentsRepository.deleteComment(req.body)
            return res.status(200).json({
                message: "Delete a comment successfully!",
                deleted: result
            });
        } catch (error) {
            return res.status(500).json({
                message: "Can not delete a comment!",
            });
        }
    }
}

export default commentController

