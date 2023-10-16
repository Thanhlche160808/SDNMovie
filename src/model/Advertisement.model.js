import mongoose from "mongoose";

const AdvertisementSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    rank: Number,
    totalShare: Number,
    adContent: [
        {
            url: String,
            content: String,
        },
    ],
});
let Advertisement = mongoose.model("Advertisement", AdvertisementSchema);
export default Advertisement;