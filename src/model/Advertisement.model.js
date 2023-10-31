import mongoose from "mongoose";

const AdvertisementSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    rank: Number,
    totalShare: Number,
    adContent: [
        {
            image: String,
            url: {
                type: String,
                required: true,
            },
            content: String,
        }],
}, { timestamps: true });
let Advertisement = mongoose.model("Advertisement", AdvertisementSchema);
export default Advertisement;