const { Downloader, GetUserPosts, StalkUser } = require("@tobyg74/tiktok-api-dl");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 1. Download a single video by URL
app.get("/api/download", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ status: "error", message: "TikTok URL is required. Pass it as ?url=..." });
    try {
        const result = await Downloader(url, { version: "v2" });
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// 2. Get User Details
app.get("/api/user", async (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ status: "error", message: "Username is required. Pass it as ?username=..." });
    try {
        const result = await StalkUser(username);
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// 3. Get User Posts (All videos of a user)
app.get("/api/user-posts", async (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ status: "error", message: "Username is required. Pass it as ?username=..." });
    try {
        const result = await GetUserPosts(username);
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TikTok Downloader API is running on port ${PORT}`));

module.exports = app;
