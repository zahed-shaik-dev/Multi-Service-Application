const mongoose = require("mongoose");
const config = require("./config");

async function connectMongoDB() {
  const uri =
    `mongodb://${encodeURIComponent(config.mongoUser)}:` +
    `${encodeURIComponent(config.mongoPassword)}@` +
    `${config.mongoHost}:${config.mongoPort}/appdb?authSource=admin`;

  await mongoose.connect(uri);

  console.log("Connected to MongoDB");
}

module.exports = connectMongoDB;