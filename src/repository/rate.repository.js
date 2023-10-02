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
                message: "You have successfully updated your review!!!"
            }
        } else {
            const rate = await Rate.create({
                movieSeasonID: rateInfo.movieSeasonID,
                userID: rateInfo.userID,
                rate: rateInfo.rate,
                content: rateInfo.content,
                MovieSlug: rateInfo.MovieSlug,
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
                    timestamps: false,
                }
            );
            return {
                message: "You have successfully posted your review!!!",
                data: rate
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