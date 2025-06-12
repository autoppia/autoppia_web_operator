const express = require("express");
const router = express.Router();
const User = require("../../models/user");

// GET user route
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(200).json({ user: user });
    } else {
      const newUser = new User({
        email: email,
      });
      const savedUser = await newUser.save();
      res.status(200).json({ user: savedUser });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { email, instructions } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      user.instructions = instructions;
      const savedUser = await user.save();
      res.status(200).json({ user: savedUser });
    } else {
      console.error("Failed to update")
      res.status(500).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
