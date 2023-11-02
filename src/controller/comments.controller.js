import { commentsRepository } from "../repository/index.js"
import { validationResult } from 'express-validator';

const commentController = {
    addAComments: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);
        try {
            const newComment = await commentsRepository.addAComments(req.body);
            return res.status(200).json(newComment);
        } catch (error) {
            return res.status(500).json({
                message: 'Can not add comments!!!',
            });
        }
    },
    getCommentsByMovie: async (req, res) => {
        try {
            const result = await commentsRepository.getCommentsByMovie(req.query);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: 'Can not get comments by movie!!!',
            });
        }
    },
    likeComment: async (req, res) => {
        try {
            const result = await commentsRepository.likeComment(req.body)
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    deleteComment: async (req, res) => {
        try {
            await commentsRepository.deleteComment(req.body)
            return res.status(200).json("Delete a comment successfully!");
        } catch (error) {
            return res.status(500).json({
                message: "Can not delete a comment!",
            });
        }
    },
    replyComment: async (req, res) => {
        try {
            const result = await commentsRepository.replyComment(req)
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Can not reply a comment!",
            });
        }
    },
    updateComment: async (req, res) => {
        try {
            const result = await commentsRepository.updateComment(req)
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Can not reply a comment!",
            });
        }
    },
    updateReplyComment: async (req, res) => {
        try {
            const result = await commentsRepository.updateReplyComment(req)
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Can not update a comment!",
            });
        }
    },
    reportComment: async (req, res) => {
        try {
            const result = await commentsRepository.reportComment(req)
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Can not update a comment!",
            });
        }
    }
}

export default commentController

