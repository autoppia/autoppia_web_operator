const axios = require("axios");
const crypto = require("crypto")
const express = require("express");
const router = express.Router();

const Miner = require("../../models/miner");

const tasks = {}

const validatorUrl = "https://validator.autoppia.com"

router.post("/run-task", async (req, res) => {
    try {
        const { task, url } = req.body;
        const taskId = crypto.randomUUID();

        // const randomMiner = await Miner.aggregate([{ $sample: { size: 1 } }]);
        // const endpoint = `${validatorUrl}/${randomMiner[0].apiPath}/run-task`
        const endpoint = `http://localhost:5000/run-task`

        const response = await axios.post(endpoint, {
            id: taskId,
            task: task,
            url: url
        });
        if (response.status !== 200) {
            return res.status(500).json({ error: "Error running task" });
        }

        tasks[taskId] = {
            id: taskId,
            task: task,
            url: url,
            status: "pending",
            steps: [],
            screenshots: [],
            output: ""
        };
        res.status(200).json({ id: taskId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
})

router.put("/update-task", async (req, res) => {
    try {
        const { id, status, step, screenshot, output } = req.body;
        const task = tasks[id];
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        if (status != undefined) {
            task.status = status;
        }

        if (step != undefined) {
            task.steps.push(step);
        }

        if (screenshot != undefined) {
            task.screenshots.push(screenshot);
        }

        if (output != undefined) {
            task.output = output;
        }
        res.status(200).json({ message: "Task updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
})

router.get("/task/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = tasks[id];
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        const { screenshots, ...rest } = task;
        res.status(200).json(rest);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
})

router.get("/task/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const task = tasks[id];
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({ status: task.status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
})

router.get("/task/:id/screenshots", async (req, res) => {
    try {
        const { id } = req.params;
        const task = tasks[id];
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({ screenshots: task.screenshots });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
})

module.exports = router;
