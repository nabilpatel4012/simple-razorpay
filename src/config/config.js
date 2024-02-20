const dotenv = require("dotenv");
dotenv.config();

const DB = {
  dbUser: process.env.PG_USER,
  dbPass: process.env.PG_PASS,
  dbHost: process.env.PG_HOST,
  dbPort: process.env.PG_PORT,
  dbName: process.env.PG_DB,
};

const RedisDB = {
  redisQueue: process.env.REDIS_QUEUE,
  redisDB: process.env.REDIS_URL,
};

const C2M = {
  C2MUser: process.env.REACT_APP_C2MUSER,
  C2MPassword: process.env.REACT_APP_C2MPASSWORD,
  C2MBaseUrl: process.env.REACT_APP_BASEURL,
};

const AccessCreds = {
  keyId: process.env.KEY_ID,
  keySecret: process.env.KEY_SECRET,
};

module.exports = { DB, AccessCreds, RedisDB, C2M };
