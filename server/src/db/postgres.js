const { Pool } = require('pg');

const conString = process.env.DATABASE_CONNECTION_URL;

const pool = new Pool({
  connectionString: conString,
  // host: "localhost",
  // user: "postgres",
  // port: 5432,
  // database: "news-database",
  // password: "root",
});

// i am creating this function for error handling. whenever any error occurs at postgres connection pool, it will forcefully close the Node.js process
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const query = async (query, params = []) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(query, params);
    return result.rows;
  } catch (err) {
    // console.error(err);
    throw new Error(err.message);
  } finally {
    if (client) {
      client.release();
    }
  }
};

module.exports = {
  query
};
