const express = require('express');
const router = express.Router();

// Configuration for paths
const localPath = "/socket.io";

const minerPaths = [
    "/miner_1/socket.io",
    "/miner_2/socket.io",
    "/miner_3/socket.io",
    "/miner_4/socket.io",
    "/miner_5/socket.io",
];

// Operator route to generate socket.io paths
router.post("/", async (req, res) => {
    try {
        const { agentCount } = req.body;
        const socketioPaths = Array(agentCount).fill().map(() => {
            // return minerPaths[Math.floor(Math.random() * minerPaths.length)];
            return localPath;
        });

        res.json({ socketioPaths: socketioPaths });
    } catch (error) {
        console.error("Error in operator route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;