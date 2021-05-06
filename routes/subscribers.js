const mongoose = require("mongoose");
const Subscriber = require("../models/subscriber");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getSubscriber, async (req, res) => {
  res.json(res.subscriber);
});
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(500).json({ message: "Cant create new one" });
  }
});
router.patch("/:id", getSubscriber, async (req, res) => {
  const fields = ["name", "subscribedToChannel"];
  fields.forEach((val) => {
    if (req.body[val] != null) {
      res.subscriber[val] = req.body[val];
    }
  });

  try {
    const updatedsubscriber = await res.subscriber.save();
    res.json(updatedsubscriber);
  } catch (err) {
    res.status(400).json({ message: "can't update" });
  }
});

router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Deleted subscriber" });
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
  } catch (err) {
    return res.status(400).json({ message: "Subscriber not found" });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;
