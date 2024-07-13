const news = require("../models/savedNews");

const saveNews = async (req, res) => {
    // console.log(req.body)
    try {
        const { title, description, url, image_url, source, published_date, content,user } = req.body;
        const newsData = new news({
            title,
            description,
            url,
            image_url,
            source : source || "",
            published_date,
            content,
            user
        });
        await newsData.save();
        res.status(201).send({ newsData });
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
}


module.exports = saveNews;