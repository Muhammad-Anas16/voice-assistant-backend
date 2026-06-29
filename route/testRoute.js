import express from "express";
import TinyTTSService from "../services/TinyTTSService.js";

const router = express.Router();

router.post("/test-tts", async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Text is required."
            });
        }

        const audio = await TinyTTSService(text);

        return res.send(audio);

    } catch (err) {
        console.error("TTS Error:", err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

export default router;