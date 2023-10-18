const request = require("request");
const fetch = require("node-fetch");
const url = "https://inshorts.com/api/en/search/trending_topics";

const getNewsCategories = async () => {
  try {
    const response = await fetch(url);
    const { data } = await response.json();

    return data.trending_tags;
  } catch (error) {
    throw error;
  }
};

const getNewsFromInshortsAPI = async (category, page) => {
  try {
    console.log('before', page);

    if (page == null || page == undefined) {
      page = 1
    } else {
      page  = page + 1
    }
    
    const newsUrl = `${url}/${category}&page=${page}`;

    console.log('after', page);
    console.log(category);

    const response = await fetch(newsUrl);
    const { data } = await response.json();

    return data
  } catch (error) {
    throw error
  }
  
  
  // request({ url: newsUrl, json: true }, async (error, response) => {
  //   try {
  //     if (error) {
  //       throw new Error(error);
  //     }

  //     const { data } = response.body;
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // });
};

module.exports = {
  getNewsCategories,
  getNewsFromInshortsAPI,
};
