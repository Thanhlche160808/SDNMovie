import Advertisement from "../model/Advertisement.model.js";

const addvertisementRepository = {
    addAdvertisement: async (advInfo) => {
        const newAdvertisementData = {
            rank: advInfo.rank,
            adContent: [
                {
                    image: advInfo.image,
                    url: advInfo.url,
                    content: advInfo.content,
                }],
        };
        const newAdv = await Advertisement.create(newAdvertisementData);
        return newAdv;
    }
};
export default addvertisementRepository; 