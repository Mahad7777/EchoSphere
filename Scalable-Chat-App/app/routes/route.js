const express = require('express');
const router = express.Router();
const { fetchMessagesFromRedis } = require("../redis/redis")

router.get("/checkbackend", async (req, res) => {
    try {
        // Respond with a JSON message
        res.json({ message: "Backend is running!" });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.post("/get_messages", async (req, res) => {
    let msg = await fetchMessagesFromRedis();
    res.json(msg);
});

router.get("/", async (req, res) => {
    return res.json({ status: true });
});


module.exports = router;