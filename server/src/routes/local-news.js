const router = require("express").Router();
const {
  getNewsDetails,
  getNewsByLocality,
  addNews,
  updateNews,
  deleteNewsById,
} = require("../controllers/local-news");
const auth = require('../middlewares/auth')

router.get("/", auth, getNewsByLocality);
router.post("/add", auth, addNews);
router.put("update/:newsId", auth, updateNews);
router.delete("/delete/:newsId", auth, deleteNewsById);
router.get("/:newsId", auth, getNewsDetails);

module.exports = router;
