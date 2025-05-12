const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors())
app.use(express.json());

const localEndpoint = "http://localhost:5000"

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
  }
  res.json({ socketioPaths: socketioPaths });
});

const port = 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
