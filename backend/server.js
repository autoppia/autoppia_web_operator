const express = require("express");
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Import Routes
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");

const { MONGO_CONNECTION_URI } = require("./config");

mongoose
  .connect(MONGO_CONNECTION_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use("/", webRoutes);
app.use("/api", apiRoutes);

const swaggerDocument = yaml.load(fs.readFileSync('./config/openapi.yaml', 'utf8'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.topbar { display: none; }'
}));

// Start Server
const port = 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
