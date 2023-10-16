import { movieRepository } from "../repository/index.js"

const movieController = {
    addMovie: async (req, res) => {
        try {
            const newMovie = await movieRepository.addMovie(req.body);
            return res.status(200).json({
                message: 'Add a movie successfully!!!',
                data: newMovie
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Can not add a movie!!!',
            });
        }
    },
    getAllMovie: async (req, res) => {
        try {
            const allMovies = await movieRepository.getAllMovie();
            return res.status(200).json({
                message: 'Get all movies successfully!!!',
                data: allMovies
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Can not get all movies!!!',
            });
        }
    },
    addSeason: async (req, res) => {
        try {
            const seasonMovies = await movieRepository.addSeason(req.body);
            return res.status(200).json({
                message: 'Add season of movies successfully!!!',
                data: seasonMovies
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Can not add season of movies!!!',
            });
        }
    },
    getAllRateByMovie: async (req, res) => {
        try {
            const getAllRateByMovie = await movieRepository.getAllRateByMovie();
            return res.status(200).json(getAllRateByMovie)
        } catch (error) {
            return res.status(500).json({
                message: 'Can not get all rate by movie!!!',
            });
        }
    },
}


export default movieController
