const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors())
app.use(express.json());

const automataEndpoint = "http://107.189.20.116:5000";

const bittensorEndpoints = [
  "http://107.189.20.116:5001",
  "http://107.189.20.116:5002",
  "http://107.189.20.116:5003",
  "http://107.189.20.116:5004",
  "http://107.189.20.116:5005",
  "http://107.189.20.116:5006",
  "http://107.189.20.116:5007",
  "http://107.189.20.116:5008",
  "http://107.189.20.116:5009",
  "http://107.189.20.116:5010"
]

app.post("/operator", async (req, res) => {
  const { targetAgent, agentCount } = req.body;
  const endpoints = []
  switch (targetAgent) {
    case "Autoppia":
      for (let i = 0; i < agentCount; i++) {
        endpoints.push(automataEndpoint);
      }
      break;
    case "Bittensor":
      // const minerList = await axios.get("https://api.bittensor.com/v1/miners");
      const minerList = bittensorEndpoints;
      for (let i = 0; i < agentCount; i++) {
        endpoints.push(minerList[Math.floor(Math.random() * minerList.length)]);
      }
      break;
    default:
      break;
  }
  res.json({ endpoints: endpoints })
});

const port = 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
