import Rate from '../model/Rate.model.js';
import MovieSeason from '../model/MovieSeason.model.js';

const rateRepository = {
    addRate: async (rateInfo) => {
        const check = await Rate.findOne({
            movieSeasonID: rateInfo.movieSeasonID,
            userID: rateInfo.userID,
        });
        if (check) {
            await check.updateOne({
                $set: { rate: parseInt(rateInfo.rate), content: rateInfo.content },
            });
            const rateMovie = await Rate.find({
                movieSeasonID: rateInfo.movieSeasonID,
            });
            let totalRate = 0;
            rateMovie.forEach((item) => (totalRate += item?.rate));
            totalRate = (totalRate / rateMovie?.length).toFixed(1);
            await MovieSeason.updateOne(
                { _id: rateInfo.movieSeasonID },
                {
                    $set: {
                        totalRate: totalRate,
                        numberRate: rateMovie?.length,
                    },
                },
                {
                    new: false,
                }
            );
            return {
                msg: "You have successfully updated your review!!!"
            }
        } else {
            const rate = new Rate({
                movieSeasonID: rateInfo.movieSeasonID,
                userID: rateInfo.userID,
                rate: rateInfo.rate,
                content: rateInfo.content,
                MovieSlug: rateInfo.MovieSlug,
            });
            const res = await rate.save();
            const rateMovie = await Rate.find({
                movieSeasonID: rateInfo.movieSeasonID,
            });
            let totalRate = 0;
            rateMovie.forEach((item) => (totalRate += item?.rate));
            totalRate = (totalRate / rateMovie?.length).toFixed(1);
            await MovieSeason.updateOne(
                { _id: rateInfo.movieSeasonID },
                {
                    $set: {
                        totalRate: totalRate,
                        numberRate: rateMovie?.length,
                    },
                },
                {
                    timestamps: false,
                }
            );
            return {
                msg: "You have successfully posted your review!!!",
                rate: res
            }
        }
    },
    getRateMovie: async (rateParams) => {
        const { slug } = rateParams;
        const rate = await Rate.find({ MovieSlug: slug })
            .populate("userID", "showName")
            .sort({ updatedAt: -1 });
        return rate
    }
}

export default rateRepository