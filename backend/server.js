const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const operatorRoutes = require("./routes/operator");
const historyRoutes = require("./routes/history");

// Connect to Database
require("dotenv").config();

const MONGO_CONNECTION_URI = process.env.MONGO_CONNECTION_URI || "mongodb://localhost:27017/automata";

mongoose.connect(MONGO_CONNECTION_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use("/operator", operatorRoutes);
app.use("/history", historyRoutes);

// Start Server
const port = 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
