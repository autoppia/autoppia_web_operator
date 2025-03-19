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
  const endpoint = agentEndpoints[Math.floor(Math.random() * agentEndpoints.length)];
  console.log("Allocated an agent:", endpoint);
  res.json({ endpoint: endpoint })
});

const port = 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
