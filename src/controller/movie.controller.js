import { movieRepository } from "../repository/index.js"

const movieController = {
    addMovie: async (req, res) => {
        try {
            const newMovie = await movieRepository.addMovie(req.body);
            return res.status(200).json({
                message: 'Add a movie successfully',
                data: newMovie
            });
        } catch (error) {
            return res.status(500).json({
                error: error
            });
        }
    },
    getAllMovie: async (req, res) => {
        try {
            const allMovies = await movieRepository.getAllMovie();
            return res.status(200).json({
                message: 'Get all movies successfully',
                data: allMovies
            });
        } catch (error) {
            return res.status(500).json({
                error: error
            });
        }
    },
}

export default movieController
