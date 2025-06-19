require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV || "development";

const MONGO_CONNECTION_URI =
    process.env.MONGO_CONNECTION_URI || "mongodb://localhost:27017/automata";

module.exports = {
    NODE_ENV,
    MONGO_CONNECTION_URI,
};