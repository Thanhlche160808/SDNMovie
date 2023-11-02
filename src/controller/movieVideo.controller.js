import { movieVideoRepository, watchingHistoryRepository } from "../repository/index.js"
import { validationResult } from 'express-validator';

const movieVideoController = {
    addVideo: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);
        try {
            const newVideo = await movieVideoRepository.addVideo(req.body);
            return res.status(200).json(newVideo);
        } catch (error) {
            return res.status(500).json({
                message: 'Can not add video!!!',
            });
        }
    },
    getVideo: async (req, res) => {
        const { slug, userID } = req.query;
        try {
            const getVideo = await movieVideoRepository.getVideo(slug);
            if (userID){
                await watchingHistoryRepository.addWatchingHistory(getVideo.video, userID);
            }
            return res.status(200).json(getVideo);
        } catch (error) {
            return res.status(500).json({
                message: 'Can not get video!!!',
            });
        }
    },
}

export default movieVideoController

