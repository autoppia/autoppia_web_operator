const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors())
app.use(express.json());

const agentEndpoints = [
  "http://54.195.214.72:5000",
  "http://54.195.214.72:5000",
  "http://54.195.214.72:5000",
  "http://54.195.214.72:5000",
  "http://54.195.214.72:5000"
]

app.get("/operator", async (req, res) => {
  availableAgents = agentEndpoints.filter(async (url) => {
    try {
      const response = await axios.get(`${url}/status`);
      return response.data.available
    } catch (error) {
      return false
    }
  });
  if (availableAgents.length === 0) {
    console.log("No available agents");
    return res.status(500).json({ error: "No available agents" });
  }
  const endpoint = availableAgents[Math.floor(Math.random() * availableAgents.length)];
  console.log("Allocated an agent:", endpoint);
  res.json({ endpoint: endpoint })
});

const port = 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
