const express = require('express');
const router = express.Router();
const History = require('../models/history');

// GET history route
router.get("/", async (req, res) => {
    try {
        const { email } = req.query;
        const histories = await History.find({ email }).sort({ createdAt: -1 });
        res.status(200).json({ histories: histories });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});

// POST save history route
router.post("/save", async (req, res) => {
    try {
        const { email, socketioPath, prompt, initialUrl, historyPath } = req.body;
        const newHistory = new History({
            email: email,
            socketioPath: socketioPath,
            prompt: prompt,
            initialUrl: initialUrl,
            historyPath: historyPath
        });
        await newHistory.save();
        res.status(200).json({ newHistory: newHistory });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});

module.exports = router;