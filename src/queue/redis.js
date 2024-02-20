const { Redis } = require("ioredis");
const { RedisDB } = require("../config/config");

const client = new Redis(RedisDB.redisDB);

module.exports = {
  client, // pushToQueue,
};
