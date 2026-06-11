import express from "express";
import fs from "fs";
import { transcribeAudio } from "../utils/transcribeAudio.js";

const router = express.Router();

router.get("/test-transcribe", (req, res) => {
    const filePath =
        "C:/Users/M - Anas/Desktop/express/uploads/audio-1781073426835.wav";

    transcribeAudio(filePath, (err, text) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message,
            });
        }

        // delete file after transcription
        fs.unlink(filePath, (delErr) => {
            if (delErr) {
                console.log("❌ Delete error:", delErr.message);
            } else {
                console.log("🗑️ File deleted successfully");
            }
        });

        res.json({
            success: true,
            transcript: text,
        });
    });
});

export default router;