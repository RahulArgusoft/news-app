const { CronJob } = require("cron");
const { getNewsCategories } = require("../services/newsAPI");
const { fetchNewsCategoriesFromDB, addNewsCategoriesToDB } = require("../services/categories");

const fetchtrendingNewsCategories = async () => {
  try {
    // fetch categories from API as well as database to compare
    const storedCategories = await fetchNewsCategoriesFromDB();
    const latestCategories = await getNewsCategories();

    const storedCategoryTags = storedCategories.map((category) => {
      return category.tag_id;
    });
    console.log("latestCategories", latestCategories.length);
    console.log("storedCategories", storedCategories.length);

    const newCategories = latestCategories.filter((category) => {
      return !storedCategoryTags.includes(category.tag);
    });

    //   for(tag of newCategories) {
    //     // await addNewsCategoriesToDB(tag.tag, tag.label);
    //     console.log(tag);
    //   }

    if (newCategories.length) {
      console.log(newCategories.length, " categories added.");
      const formatedNewCategories = newCategories.map((tag) => ({
        tag_id: tag.tag,
        tag_name: tag.label,
        image_url: tag.image_url,
      }));

      await addNewsCategoriesToDB(formatedNewCategories);
    } else {
      console.log("no new categories");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const job = new CronJob(
  // this will be envoked at 9:00 A.M every morning -- * 0 9 * * *
  "* 0 9 * * *",
  () => {
    fetchtrendingNewsCategories();
  },
  null,
  null,
  "Asia/Kolkata"
);

job.start();
