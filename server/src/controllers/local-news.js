const localNewsService = require("../services/local-news");
const LocalNewsTagsService = require("../services/local-news-tags");
const locationService = require("../services/location");
const dayjs = require("dayjs");

const getNewsByLocality = async (req, res) => {
  try {
    // const ip = req.ip;
    // const { city, country } = await locationService.getchLocationFromIp()
    const { city, country } = req.userLocation;
    const { page } = req.query;

    const newsList = await localNewsService.getNewsByLocality(city, page);

    const temp = newsList.map((item) => ({
      ...item,
      created_at: dayjs(item.created_at).format(
        "h:mm A on dddd, DD MMMM, YYYY"
      ),
    }));

    return res.status(200).send({ response: temp });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const addNews = async (req, res) => {
  try {
    const { username: created_by } = req.user;
    const { title, content, image_url, tags } = req.body;

    // const ip = req.ip
    // const { city, country } = await locationService.getchLocationFromIp();

    const { city, country } = req.userLocation;
    const newsData = await localNewsService.addNews(
      title,
      content,
      image_url,
      city,
      country,
      created_by
    );

    console.log(newsData);

    await LocalNewsTagsService.addLocalNewsTags(newsData.article_id, tags);

    if (!newsData) {
      return res.status(500).send({ error: "news not added" });
    }

    return res.status(200).send({ news: newsData, tags });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateNews = async (req, res) => {
  try {
    const { newsId } = req.params;
    const { title, content, image_url, city, country } = req.body;

    const news = await localNewsService.updateNewsById(
      newsId,
      title,
      content,
      image_url,
      city,
      country
    );

    return req.status(200).send({ news });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteNewsById = async (req, res) => {
  try {
    const { newsId } = req.params;

    const news = await localNewsService.deleteNewsById(newsId);

    if (!news) {
      return res.status(404).send({ error: "news not deleted" });
    }

    return res.status(200).send({ status: "success", news });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getNewsDetails = async (req, res) => {
  try {
    const { newsId } = req.params;

    const news = await localNewsService.getNewsByID(newsId);

    if (!news) {
      return res.status(404).send({ error: "news not found" });
    }

    const formattedNewsItem = {
      ...news,
      created_at: dayjs(news.created_at).format(
        "h:mm A on dddd, DD MMMM, YYYY"
      ),
    };

    return res.status(200).send({ response: formattedNewsItem });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getNewsByLocality,
  updateNews,
  addNews,
  deleteNewsById,
  getNewsDetails,
};
