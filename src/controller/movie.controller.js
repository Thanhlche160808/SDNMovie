import { movieRepository } from "../repository/index.js"
import { validationResult } from 'express-validator';

const movieController = {
    addMovie: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);
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
    getAllRateByMovie: async (req, res) => {
        try {
            const getAllRateByMovie = await movieRepository.getAllRateByMovie();
            return res.status(200).json(getAllRateByMovie)
        } catch (error) {
            return res.status(500).json({
                message: 'Can not get all rate by movie!!!',
            })
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

    deleteMovie: async (req, res) => {
        try {
            const deletedMovie = await movieRepository.deleteMovie(req.body.slug);
            return res.status(200).json("Delete a movie successfully!");
        } catch (error) {
            return res.status(500).json({
                message: "Can not delete a movie!",
            });
        }
    }
}


export default movieController
