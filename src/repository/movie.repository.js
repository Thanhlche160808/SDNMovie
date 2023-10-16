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
    getAllRateByMovie: async () => {
        const movieRatings = await MovieSeason.aggregate([
            {
                $group: {
                    _id: '$movieID',
                    numberRatings: { $sum: '$numberRate' } 
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
                    numberRatings: 1
                }
            },
            {
                $sort: { numberRatings: -1 }
            }
        ]);
    
        for (const movie of movieRatings) {
            const movieID = movie._id;
            const numberRatings = movie.numberRatings;
            await Movie.updateOne({ _id: movieID }, { numberRatings: numberRatings });
        }
    
        return movieRatings;
    },
    get10RateByMovie: async () => {
        const topMovies = await MovieSeason.aggregate([
            {
                $sortByCount: { totalRate: -1 } // Sắp xếp các mùa/seasons theo điểm đánh giá giảm dần
            },
            {
                $limit: 10 // Giới hạn kết quả chỉ lấy 10 phim
            },
            {
                $project: {
                    _id: 0,
                    movieID: "$movieID",
                    movieSeasonID: "$movieSeasonID",
                    movieName: "$name",
                    maxRating: "$totalRate"
                }
            }
        ]);
    
        return topMovies;
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
                $sort: { totalViews: -1 }
            }
        ]);

        for (const movie of movieSeasons) {
            const movieID = movie._id;
            const totalViews = movie.totalViews;
            await Movie.updateOne({ _id: movieID }, { totalView: totalViews });
        }

        return movieSeasons
    },
}

export default movieRepository