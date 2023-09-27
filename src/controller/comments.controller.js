import { commentsRepository } from "../repository/index.js"

const addAComments = async (req, res) => {
    try {
        const newComment = await commentsRepository.addAComments(req.body);
        return res.status(200).json({
            message: 'Add comments successfully',
            data: newComment
        });
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}

export default {
    addAComments
}
