import { movieVideoRepository } from "../repository/index.js"

const movieVideoController = {
    addVideo: async (req, res) => {
        try {
            const newVideo = await movieVideoRepository.addVideo(req.body);
            return res.status(200).json(newVideo);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getVideo: async (req, res) => {
        try {
            const getVideo = await movieVideoRepository.getVideo(req.params);
            return res.status(200).json(getVideo);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default movieVideoController

