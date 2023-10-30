import { watchingHistoryRepository } from "../repository/index.js";

const watchingHistoryController = {
    getUserWatchingHistory: async (req, res) => {
        try {
            const userId = req.body.userID;
            const watchingHistory = await watchingHistoryRepository.getUserWatchingHistory(userId);
            return res.status(200).json(watchingHistory);
        } catch (error) {
            return res.status(500).json({
                message: 'Can not get watching history!!!',
            });
        }
    }
};
export default watchingHistoryController;