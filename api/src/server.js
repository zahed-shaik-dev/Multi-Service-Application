const express = require("express");
const mongoose = require("mongoose");
const { createClient } = require("redis");

const config = require("./config");
const connectMongoDB = require("./db");
const itemsRouter = require("./routes/items");

const app = express();

app.use(express.json());

let redisClient;

app.get("/health", async (req, res) => {
  const mongoStatus =
    mongoose.connection.readyState === 1;

  let redisStatus = false;

  try {
    redisStatus =
      redisClient &&
      redisClient.isReady;
  } catch {
    redisStatus = false;
  }

  if (mongoStatus && redisStatus) {
    return res.status(200).json({
      status: "healthy",
      services: {
        api: "healthy",
        mongodb: "healthy",
        redis: "healthy"
      }
    });
  }

  return res.status(503).json({
    status: "unhealthy",
    services: {
      api: "healthy",
      mongodb: mongoStatus ? "healthy" : "unhealthy",
      redis: redisStatus ? "healthy" : "unhealthy"
    }
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Multi-Service Application API",
    version: "1.0.0"
  });
});

app.use("/api/items", itemsRouter);

async function startServer() {
  try {
    await connectMongoDB();

    redisClient = createClient({
      socket: {
        host: config.redisHost,
        port: Number(config.redisPort)
      }
    });

    redisClient.on("error", (err) => {
      console.error("Redis error:", err);
    });

    await redisClient.connect();

    app.listen(config.port, "0.0.0.0", () => {
      console.log(
        `API running on port ${config.port}`
      );
    });
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
}

startServer();