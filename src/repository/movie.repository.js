import Movie from '../model/Movie.model.js';


const movieRepository = {
    addMovie: async (movieInfo) => {
        try {
            const newMovie = await Movie.create(
                {
                    movieName: movieInfo.movieName,
                }
            );
            return newMovie
        } catch (error) {
            return null;
        }
    },
    getAllMovie: async () => {
        try {
            const movies = await Movie.find()
            return movies
        } catch (error) {
            return null;
        }
    },
}

export default movieRepository