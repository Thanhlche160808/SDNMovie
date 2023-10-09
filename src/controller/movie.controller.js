import { movieRepository } from "../repository/index.js"

const movieController = {
    addMovie: async (req, res) => {
        try {
            const newMovie = await movieRepository.addMovie(req.body);
            return res.status(200).json(newMovie)
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getAllMovie: async (req, res) => {
        try {
            const allMovies = await movieRepository.getAllMovie();
            return res.status(200).json(allMovies);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    addSeason: async (req, res) => {
        try {
            const seasonMovies = await movieRepository.addSeason(req.body);
            return res.status(200).json(`Thêm ${seasonMovies} thành công !`);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
}

export default movieController
