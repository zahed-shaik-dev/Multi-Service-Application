const fs = require("fs");

function readSecret(path) {
  try {
    return fs.readFileSync(path, "utf8").trim();
  } catch {
    return null;
  }
}

const mongoPassword =
  readSecret("/run/secrets/mongo_root_password") ||
  process.env.MONGO_PASSWORD ||
  "";

module.exports = {
  port: process.env.PORT || 5000,

  mongoHost: process.env.MONGO_HOST || "mongodb",
  mongoPort: process.env.MONGO_PORT || 27017,
  mongoUser: process.env.MONGO_USER || "admin",
  mongoPassword,

  redisHost: process.env.REDIS_HOST || "redis",
  redisPort: process.env.REDIS_PORT || 6379
};