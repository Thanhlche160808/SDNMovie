import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const WatchingHistorySchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    userID: Number,
    movie:
        [
            {
                movieID: Number,
                movieSeason: Number,
                movieVideo: [
                    {
                        video: String,
                        movieVideoID: Number,
                        slug: {
                            type: String,
                            // slug: "name",
                        },
                    },
                ],
            },
        ]
});
let WatchingHistory = mongoose.model("WatchingHistory", WatchingHistorySchema);
export default WatchingHistory;