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
        return seasonInfo.slug
    },
}

export default movieRepository