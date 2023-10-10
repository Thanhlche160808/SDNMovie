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
    getAllViewByMovie: async () => {
        const movieSeasons = await MovieSeason.aggregate([
            {
                $group: {
                    _id: '$movieID',
                    totalViews: { $sum: '$view' }
                }
            },
            {
                $lookup: {
                    from: 'movies',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'movie'
                }
            },
            {
                $unwind: '$movie'
            },
            {
                $project: {
                    _id: 1,
                    movieName: '$movie.movieName',
                    totalViews: 1
                }
            },
            {
                $sort: { totalViews: -1 } // Sort by total views in descending order
            }
        ]);

        return movieSeasons
    },
}

export default movieRepository