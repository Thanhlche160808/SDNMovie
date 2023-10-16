import { commentsReplyRepository } from "../repository/index.js"

const commentReplyController = {
    updateComment: async (req, res) => {
        try {
            const result = await commentsReplyRepository.updateComment(req)
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Can not update a comment!",
            });
        }
    }
}

export default commentReplyController

