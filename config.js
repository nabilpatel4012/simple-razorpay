const dotenv = require("dotenv");
dotenv.config();

const DB = {
  dbUser: process.env.PG_USER,
  dbPass: process.env.PG_PASS,
  dbHost: process.env.PG_HOST,
  dbPort: process.env.PG_PORT,
  dbName: process.env.PG_DB,
};

const AccessCreds = {
  keyId: process.env.KEY_ID,
  keySecret: process.env.KEY_SECRET,
};

module.exports = { DB, AccessCreds };
