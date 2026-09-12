const express = require("express");

const router = express.Router();

const items = [];

router.get("/", (req, res) => {
  res.json(items);
});

router.post("/", (req, res) => {
  const item = {
    id: items.length + 1,
    name: req.body.name,
    createdAt: new Date()
  };

  items.push(item);

  res.status(201).json(item);
});

module.exports = router;