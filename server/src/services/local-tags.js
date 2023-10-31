const db = require("../db/postgres");

const getAllLocalTags = async () => {
  try {
    const result = await db.query("SELECT * from local_tags", []);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllLocalTags,
};