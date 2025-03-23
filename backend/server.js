const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors())
app.use(express.json());

const automataEndpoint = "http://54.195.214.72:5000";

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
      const minerList = await axios.get("https://api.bittensor.com/v1/miners");
      for (let i = 0; i < agentCount; i++) {
        endpoints.push(minerList[Math.floor(Math.random() * minerList.length)]);
      }
      break;
    default:
      break;
  }
  console.log("Endpoints sent:", endpoints);
  res.json({ endpoints: endpoints })
});

const port = 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
