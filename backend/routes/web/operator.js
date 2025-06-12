const express = require('express');
const router = express.Router();

const Miner = require("../../models/miner");

const storageState = require("../../storage_state.json")
const localPath = "/socket.io";

// Operator route to generate socket.io paths
router.post("/", async (req, res) => {
    try {
        const { agentCount } = req.body;
        
        // For Production
        const randomMiners = await Miner.aggregate([{ $sample: { size: agentCount } }]);
        const socketioPaths = randomMiners.map(miner => miner.socketioPath);

        // For Development
        // const socketioPaths = Array(agentCount).fill().map(() => {
        //     return localPath;
        // });

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