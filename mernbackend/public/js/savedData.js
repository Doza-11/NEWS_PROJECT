// const fileData = require("./model");
const news = require("../models/savedNews");

async function getNewsdata(req,res) {
    try {
        // Query the MongoDB collection and retrieve all documents
        const allnewsdata = await news.find({}).exec();
        console(alliledata);
        res.status(200).send(allFileData);
    } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
        throw error; // Propagate the error to the caller
    }
}

module.exports = getAllFileData;