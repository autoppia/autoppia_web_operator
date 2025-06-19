const express = require('express');
const router = express.Router();

const Miner = require("../../models/miner");
const { NODE_ENV } = require("../../config");

const storageState = require("../../storage_state.json")
const localPath = "/socket.io";

// Operator route to generate socket.io paths
router.post("/", async (req, res) => {
    try {
        const { agentCount } = req.body;

        const randomMiners = await Miner.aggregate([{ $sample: { size: agentCount } }]);
        const socketioPaths = NODE_ENV == "production"
            ? randomMiners.map(miner => miner.socketioPath)
            : Array(agentCount).fill().map(() => {
                return localPath;
            });

        res.json({
            socketioPaths: socketioPaths,
            storageState: storageState
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});

module.exports = router;