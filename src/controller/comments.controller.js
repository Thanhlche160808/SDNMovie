const commentController = {

    addAComments: async (req, res) => {
        try {
            const savedComment = await commentsRepository.addAComments(req.body);
            return res.status(200).json(savedComment);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getCommentsByMovie: async (req, res) => {
        try {
            const result = await commentsRepository.getCommentsByMovie(req.query);
            return res.status(200).json(
                result
            );
        } catch (error) {
            return res.status(500).json(error);
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
            return res.status(200).json("Xóa comment thành công !");
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}