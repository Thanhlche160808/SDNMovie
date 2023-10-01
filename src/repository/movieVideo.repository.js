import MovieVideo from '../model/MovieVideo.model.js';
import MovieSeason from '../model/MovieSeason.model.js';
import moment from 'moment/moment.js';

const movieVideoRepository = {
    addVideo: async (videoInfo) => {
        const movie = await MovieSeason.findOne({ slug: videoInfo.slug });
        const movieVideo = await MovieVideo.create({
            name: videoInfo.name,
            video: videoInfo.video,
            image: videoInfo.image,
            movieID: movie?._id,
            time: videoInfo.time,
        });
        if (videoInfo.slug) {
            const dateFormat = Date.parse(moment().format());
            await MovieSeason.updateOne(
                { slug: videoInfo.slug },
                {
                    $push: {
                        video: {
                            _id: movieVideo?._id,
                            videoID: movieVideo?.movieVideoID,
                            slug: movieVideo?.slug,
                        },
                    },
                    $set: {
                        create_At: dateFormat,
                    },
                },
                {
                    new: true,
                }
            );
        }
        return movieVideo
    },
}

export default movieVideoRepository