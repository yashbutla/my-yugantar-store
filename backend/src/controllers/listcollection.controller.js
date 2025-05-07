import CreateCollection from '../models/createcollection.model.js'

 const getAllCollection = async (req, res) => {
    try {
        const collection = await CreateCollection.find();
        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch collections", error: error.message });
    }
}

export default getAllCollection

