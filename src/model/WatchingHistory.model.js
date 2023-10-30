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
                type: mongoose.Schema.Types.ObjectId,
                ref : "MovieVideo",
            },
        ]
}, {
    timestamps: true,
});
let WatchingHistory = mongoose.model("WatchingHistory", WatchingHistorySchema);
export default WatchingHistory;