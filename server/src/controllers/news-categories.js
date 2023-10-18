const { fetchNewsCategoriesFromDB } = require("../services/categories");

const fetchCategories = async (req, res) => {
  try {
    const response = await fetchNewsCategoriesFromDB();

    const categories = response.map((category) => {
      return { tag: category.tag_id, label: category.tag_name, url: category.tag_url };
    });

    res.send({ categories });

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
};

module.exports = {
    fetchCategories,
};
