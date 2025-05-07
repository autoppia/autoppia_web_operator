const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors())
app.use(express.json());

const localEndpoint = "http://localhost:5000"

const bittensorEndpoints = [
  "https://validator.autoppia.com/miner_5001",
  "https://validator.autoppia.com/miner_5002",
  "https://validator.autoppia.com/miner_5003",
  "https://validator.autoppia.com/miner_5004",
  "https://validator.autoppia.com/miner_5005",
  "https://validator.autoppia.com/miner_5006",
  "https://validator.autoppia.com/miner_5007",
  "https://validator.autoppia.com/miner_5008",
  "https://validator.autoppia.com/miner_5009",
  "https://validator.autoppia.com/miner_5010",
]

app.post("/operator", async (req, res) => {
  const { agentCount } = req.body;
  const endpoints = []
  // const minerList = await axios.get("https://api.bittensor.com/v1/miners");
  const minerList = bittensorEndpoints;
  for (let i = 0; i < agentCount; i++) {
    endpoints.push(minerList[Math.floor(Math.random() * minerList.length)]);
  }
  res.json({ endpoints: endpoints })
});

const port = 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
