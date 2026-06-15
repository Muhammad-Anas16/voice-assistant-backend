import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import fs from "fs"
import path from "path"
import { nodewhisper } from "nodejs-whisper"

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads")
}

io.on("connection", (socket) => {
    // console.log("Client connected:", socket.id)

    socket.on("audio-chunk", async (data) => {
        try {

            const buffer = Buffer.from(data.chunk)

            const filePath = path.join(
                process.cwd(),
                "uploads",
                `audio-${Date.now()}.webm`
            )

            fs.writeFileSync(filePath, buffer)

            // console.log("Audio saved:", filePath)

            const result = await nodewhisper(filePath, {
                modelName: "tiny.en",

                autoDownloadModelName: "tiny.en",

                removeWavFileAfterTranscription: true,

                withCuda: false,

                whisperOptions: {
                    outputInCsv: false,
                    outputInJson: false,
                    outputInJsonFull: false,
                    outputInLrc: false,
                    outputInSrt: false,
                    outputInText: true,
                    outputInVtt: false,
                    outputInWords: false,

                    translateToEnglish: false,

                    splitOnWord: true,

                    wordTimestamps: false,

                    noGpu: true
                }
            })

            const cleanText = result
                .replace(/\[.*?\]/g, "") // remove timestamps
                .replace(/\r?\n/g, " ")  // remove new lines
                .replace(/\s+/g, " ")    // remove extra spaces
                .trim()

            // console.log("Transcription Result:")
            // console.log(cleanText)

            socket.emit("transcription-result", {
                success: true,
                // text: result
                text: cleanText
            })

        } catch (error) {

            console.error(error)

            socket.emit("transcription-result", {
                success: false,
                error: error.message
            })
        }
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected")
    })
})

server.listen(5000, () => {
    console.log("Server running on port 5000")
})