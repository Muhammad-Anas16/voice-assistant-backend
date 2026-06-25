// import express from "express"
// import cors from "cors"
// import http from "http"
// import { Server } from "socket.io"
// import fs from "fs"
// import path from "path"
// import { nodewhisper } from "nodejs-whisper"
// import { getAIReply } from "./helperFunction/AIReplyWithLlama.js"
// import { startLlamaServer } from "./helperFunction/startLlama.js"
// import { buffer } from "stream/consumers"
// import { deleteAudioFiles } from "./helperFunction/deleteAudioFiles.js"
// import socketResponse from "./helperFunction/socketResponse.js"

// const app = express()
// app.use(cors())
// app.use(express.json())
// app.use("/api", greetingRoute)

// const server = http.createServer(app)

// const io = new Server(server, {
//     cors: {
//         origin: "*"
//     }
// })

// let filePath = "";

// if (!fs.existsSync("uploads")) {
//     fs.mkdirSync("uploads")
// }

// io.on("connection", (socket) => {
//     socket.on("audio-chunk", async (data) => {
//         try {

//             const buffer = Buffer.from(data.chunk)

//             filePath = path.join(
//                 process.cwd(),
//                 "uploads",
//                 `audio-${Date.now()}.webm`
//             )

//             fs.writeFileSync(filePath, buffer)

//             const result = await nodewhisper(filePath, {
//                 modelName: "tiny.en",
//                 autoDownloadModelName: "tiny.en",
//                 removeWavFileAfterTranscription: true,
//                 withCuda: false,
//                 whisperOptions: {
//                     outputInCsv: false,
//                     outputInJson: false,
//                     outputInJsonFull: false,
//                     outputInLrc: false,
//                     outputInSrt: false,
//                     outputInText: true,
//                     outputInVtt: false,
//                     outputInWords: false,

//                     translateToEnglish: false,

//                     splitOnWord: true,

//                     wordTimestamps: false,

//                     noGpu: true
//                 }
//             })

//             const cleanText = result
//                 .replace(/\[.*?\]/g, "") // remove timestamps
//                 .replace(/\r?\n/g, " ")  // remove new lines
//                 .replace(/\s+/g, " ")    // remove extra spaces
//                 .trim()

//             console.log("Transcription result:", cleanText)

//             const reply = await getAIReply(cleanText)

//             socket.emit(
//                 "transcription-result",
//                 socketResponse(
//                     true,
//                     "Response Generated Successfully",
//                     cleanText,
//                     reply,
//                     false,
//                     null
//                 )
//             )

//         } catch (error) {
//             socket.emit(
//                 "transcription-result",
//                 socketResponse(
//                     false,
//                     "Didn't get Response",
//                     cleanText || "Can't hear Your Voice",
//                     reply || "Didn't Get any response from AI",
//                     true,
//                     error.message
//                 )
//             )
//         }
//     })

//     socket.on("disconnect", () => {
//         console.log("Client disconnected")
//     })
// })

// server.listen(5000, () => {
//     console.log("Server running on port 5000")
//     startLlamaServer();
// })

import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import greetingRoute from "./route/greetingRoute.js"
import offlineChatRoute from "./route/offlineChatRoute.js"
import onlineChatRoute from "./route/onlineChatRoute.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", greetingRoute)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

offlineChatRoute(io)
onlineChatRoute(io)

server.listen(5000, () => {
    console.log("Server Running On Port 5000")
})