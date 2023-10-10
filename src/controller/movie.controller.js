import { movieRepository } from "../repository/index.js"

const movieController = {
    addMovie: async (req, res) => {
        try {
            const newMovie = await movieRepository.addMovie(req.body);
            return res.status(200).json(newMovie);
        } catch (error) {
            return res.status(500).json({
                message: 'Can not add a movie!!!',
            });
        }
    },
    getAllMovie: async (req, res) => {
        try {
            const allMovies = await movieRepository.getAllMovie();
            return res.status(200).json(allMovies);
        } catch (error) {
            return res.status(500).json({
                message: 'Can not get all movies!!!',
            });
        }
    },
    addSeason: async (req, res) => {
        try {
            await movieRepository.addSeason(req.body);
            return res.status(200).json(`Thêm ${req.body.slug} thành công !`);
        } catch (error) {
            return res.status(500).json({
                message: 'Can not add season of movies!!!',
            });
        }
    },
    getAllViewByMovie: async (req, res) => {
        try {
            const getAllViewByMovie = await movieRepository.getAllViewByMovie();
            return res.status(200).json(getAllViewByMovie)
        } catch (error) {
            return res.status(500).json({
                message: 'Can not get all view by movie!!!',
            });
        }
    },
}

export default movieController
