// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import PlaySound from "play-sound";
// import fs from "fs";

// const player = PlaySound();
// const app = express();
// app.use(cors());

// // folder auto create (uploads)
// if (!fs.existsSync("uploads")) {
//     fs.mkdirSync("uploads");
// }

// // multer setup (file receive + save)
// const storage = multer.diskStorage({
//     destination: "uploads/",
//     filename: (req, file, cb) => {
//         cb(null, "audio-" + Date.now() + ".wav");
//     }
// });

// const upload = multer({ storage });

// // POST route (main logic)
// app.post("/audio", upload.single("audio"), (req, res) => {
//     try {
//         const filePath = req.file.path;

//         console.log("Audio received:", filePath);

//         // PLAY AUDIO instantly
//         player.play(filePath, (err) => {
//             if (err) console.log("Play error:", err);
//         });

//         res.json({
//             success: true,
//             message: "Audio received and playing",
//             file: filePath
//         });

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.listen(5000, () => {
//     console.log("Server running on http://localhost:5000");
// });

import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import fs from "fs"
import PlaySound from "play-sound"
import transcribeRoute from "./routes/transcribeRoute.js";

const app = express()
app.use(cors())
app.use("/api", transcribeRoute)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

const player = PlaySound()

// --------------------
// ensure uploads folder
// --------------------
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads")
}

io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id)

    socket.on("audio-chunk", (data) => {
        try {
            console.log("🎤 Chunk received:", data.chunk?.byteLength)

            // convert buffer
            const buffer = Buffer.from(data.chunk)

            // always WAV file (as requested)
            const filePath = `uploads/audio-${Date.now()}.wav`

            fs.writeFileSync(filePath, buffer)

            console.log("📁 Saved:", filePath)

            // PLAY AUDIO
            player.play(filePath, (err) => {
                if (err) {
                    console.log("❌ Play error:", err)
                } else {
                    console.log("🔊 Playing finished")
                }
            })

        } catch (err) {
            console.log("Server error:", err.message)
        }
    })

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected")
    })
})

server.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000")
})