const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors())
app.use(express.json());

require("dotenv").config();

const MONGO_CONNECTION_URI = process.env.MONGO_CONNECTION_URI || "mongodb://localhost:27017/automata";

mongoose.connect(MONGO_CONNECTION_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

const History = require("./models/history")

const localPath = "/socket.io";

const minerPaths = [
  "/miner_1/socket.io",
  "/miner_2/socket.io",
  "/miner_3/socket.io",
  "/miner_4/socket.io",
  "/miner_5/socket.io",
]

app.post("/operator", async (req, res) => {
  const { agentCount } = req.body;
  const socketioPaths = []
  for (let i = 0; i < agentCount; i++) {
    socketioPaths.push(minerPaths[Math.floor(Math.random() * minerPaths.length)]);
    // socketioPaths.push(localPath);
  }
  res.json({ socketioPaths: socketioPaths });
});

app.get("/history", async (req, res) => {
  try {
    const { email } = req.query;
    const histories = await History.find({ email, email }).sort({ createdAt: -1 });
    res.status(200).json({ histories: histories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
})

app.post("/history/save", async (req, res) => {
  try {
    console.log(req.body)
    const { email, socketUrl, prompt, initialUrl, historyJson } = req.body;
    const newHistory = new History({
      email: email,
      socketUrl: socketUrl,
      prompt: prompt,
      initialUrl: initialUrl,
      historyJson: historyJson
    });
    await newHistory.save();
    res.status(200).json({ newHistory: newHistory })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err })
  }
})

const port = 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
