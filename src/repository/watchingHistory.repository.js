import WatchingHistory from "../model/WatchingHistory.model.js";

const watchingHistoryRepository = {
    addWatchingHistory: async (video, userId) => {
        let watchingHistory = await WatchingHistory.findOne({ userID: 1 });
        if (!watchingHistory) {
            watchingHistory = await WatchingHistory.create({
                userID: 1,
                movie: [video._id],
            });
            return watchingHistory;
        }

        if (watchingHistory.movie.length >= 10) {
            watchingHistory.movie.pop();
        }
        const exist = watchingHistory.movie.find(e => video._id.equals(e));
        if (!exist) {
            watchingHistory.movie.unshift(video._id);
            watchingHistory.save();
        }
        return watchingHistory;
    },
    getUserWatchingHistory: async (userId) => {
        return await WatchingHistory.findOne({ userID: userId }).populate("movie");
    }
};
export default watchingHistoryRepository;