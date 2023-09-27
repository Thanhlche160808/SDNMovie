import { commentsRepository } from "../repository/index.js"

const commentController = {
    addAComments: async (req, res) => {
        try {
            const newComment = await commentsRepository.addACommentsService(req.body);
            return res.status(200).json({
                message: 'Add comments successfully',
                data: newComment
            });
        } catch (error) {
            return res.status(500).json({
                error: error
            });
        }
    },
    getCommentsByMovie: async (req, res) => {
        try {
            const result = await commentsRepository.getCommentsByMovieService(req.query);
            return res.status(200).json({
                message: 'get comments successfully',
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                error: error
            });
        }
    },
    likeComment: async (req, res) => {
        try {
            const result = await commentsRepository.likeCommentService(req.body)
            return res.status(200).json({ status: result });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    deleteComment: async (req, res) => {
        try {
            const result = await commentsRepository.deleteCommentService(req.body)
            return res.status(200).json({
                message: "Delete a comment successfully!",
                deleted: result
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default commentController

