const { fetchNewsFromDB, fetchNewsByCategory } = require("../services/news");
const dayjs = require("dayjs");
const getNews = async (req, res) => {
  try {
    const { page } = req.query;

    const response = await fetchNewsFromDB(page);

    const temp = response.map((item) => ({
      ...item,
      created_at: dayjs(item.created_at).format("h:mm A on dddd, DD MMMM, YYYY"),
    }));
    res.send({ response:temp });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page } = req.query;

    const response = await fetchNewsByCategory(category, page);
    res.send({ response });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getNews,
  getNewsByCategory,
};
