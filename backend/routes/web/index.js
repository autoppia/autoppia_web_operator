const express = require("express");
const router = express.Router();

const operator = require("./operator");
const history = require("./history");
const user = require("./user");

router.use("/operator", operator);
router.use("/history", history);
router.use("/user", user);

module.exports = router;