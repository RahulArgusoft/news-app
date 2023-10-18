const { CronJob } = require("cron");
const {
  getNewsFromInshortsAPI,
  getNewsCategories,
} = require("../services/newsAPI");
const {
  fetchNewsCategoriesFromDB,
  updateCategoriesTotalPage,
  updateCategoriesCurrentPage,
} = require("../services/categories");
const { addNewsToDatabase } = require("../services/news");
const { addNewsTags } = require('../services/news-tags')

const categories = {
  storedCategories: [],
  initialize: async () => {
    this.storedCategories = await fetchNewsCategoriesFromDB();
  },
  select: () => {      
    return this.storedCategories[Math.floor(Math.random() * this.storedCategories.length)];
  },
};

categories.initialize();

const fetchNews = async () => {
  try {
    if (!categories.storedCategories.length) {
      categories.storedCategories = await getNewsCategories();
    }
    let category = categories.select();
    let count = 0

    if(category.current_page == category.total_page) {
      return
    }

    const { total_page, page_num, suggested_news } = await getNewsFromInshortsAPI(category.tag_id, category.current_page);
    for (news of suggested_news) {
      if (news.news_obj) {
        let saved = await addNewsToDatabase(news.news_obj);
        for (tag of news.news_obj.category_names) {
          await addNewsTags(tag, news.news_obj.hash_id)
        }
        if(saved){
            count ++
        }
      }
    }

    
    if (page_num === 1) {
      await updateCategoriesTotalPage(category.tag_id, total_page);
      await updateCategoriesCurrentPage(category.tag_id, page_num);
    } else {
      await updateCategoriesCurrentPage(category.tag_id, page_num);
    }

    console.log(count + " news fetched for " + category.tag_name + " and page_num:", page_num);
  } catch (error) {
    console.log('>',error.message);
  } finally {
    console.log();
  }
};

const job = new CronJob(
  // this will be envoked after every 10 seconds
  "*/10 * * * * *",
  () => {
    fetchNews();
  },
  null,
  null,
  "Asia/Kolkata"
);

job.start();
