import Movie from '../model/Movie.model.js';
import MovieSeason from '../model/MovieSeason.model.js';
import User from '../model/User.model.js';

const movieRepository = {
    addMovie: async (movieInfo) => {
        const newMovie = await Movie.create(
            {
                movieName: movieInfo.movieName,
            }
        );
        return newMovie
    },
    getAllMovie: async () => {
        const movies = await Movie.find()
        return movies
    },
    addSeason: async (seasonInfo) => {
        const result = await Movie.findOneAndUpdate(
            { _id: seasonInfo._id },
            {
                $push: {
                    movieSeason: {
                        seasonName: seasonInfo.seasonName,
                        slug: seasonInfo.slug,
                    },
                },
            }
        );
        await MovieSeason.findOneAndUpdate(
            { slug: seasonInfo.slug },
            {
                $set: { movieID: seasonInfo._id },
            },
            {
                new: false,
            }
        );
        return result
    },
    markMovie: async ({ userID, movieID }) => {
        const movie = await Movie.findOne({ _id: movieID });
        if (!movie) throw new Error("Movie not found.");
        const user = await User.findOne({ _id: userID });
        const isMarked = user.mark.includes(movie._id);
        if (isMarked) {
            const markedMovie = await User.findOneAndUpdate({
                _id: userID,
            }, { $pull: { mark: movieID } });
            return markedMovie;
        } else {
            const markedMovie = await User.findOneAndUpdate({
                _id: userID,
            }, { $push: { mark: movieID } });
            return markedMovie;
        }
    },
    getMarkedMovie: async (userID) => {
        const movies = await User.findOne({ _id: userID }).populate("mark");
        return movies;
    }
}

export default movieRepository