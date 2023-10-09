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
    markMovie: async (req, resp) => {
        try {
            const { userID, movieID } = req.body;
            const movie = await movieRepository.markMovie({
                userID,
                movieID,
            });
            return resp.status(200).json({
                message: "Mark movie successfully",
                data: movie,
            });
        } catch (error) {
            return resp.status(500).json(error);
        }
    },
    getMarkMovie: async (req, resp) => {
        try {
            const { userID } = req.body;
            const movies = await movieRepository.getMarkedMovie({
                userID,
            });
            return resp.status(200).json({
                message: "Get marked movie successfully",
                data: movies,
            });
        } catch (error) {
            return resp.status(500).json(error);
        }
    },
}

export default movieController
