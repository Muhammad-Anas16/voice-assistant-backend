import fs from "fs"
import path from "path"
import socketResponse from "../components/socketResponse.js"
import { getAIReply } from "../helperFunction/AIReplyWithLlama.js"
import { startLlamaServer } from "../helperFunction/startLlama.js"
import { deleteAudioFiles } from "../components/deleteAudioFiles.js"
import saveAudioFile from "../components/saveAudioFile.js"
import nodeWhisperSpeechToText from "../components/nodeWhisperSpeechToText.js"

const offlineChatRoute = (io) => {

    io.on("connection", (socket) => {

        socket.on("offline-chat", async (data) => {

            let filePath = ""

            try {
                // Llama server starts
                startLlamaServer()
                // for saving audio files into upload folder
                filePath = saveAudioFile(data.chunk)
                // get Clean filer converted ted
                const cleanText = await nodeWhisperSpeechToText(filePath)
                // converted text to AI for getting response
                const reply = await getAIReply(cleanText)

                socket.emit(
                    "chat-response",
                    socketResponse(
                        true,
                        "Offline Response Generated using node-Whisper Speech To Text + AI Reply With LLama",
                        cleanText,
                        reply
                    )
                )

                if (reply) {
                    // setTimeout(() => deleteAudioFiles(filePath), 1000)
                    deleteAudioFiles(filePath)
                }


            } catch (error) {

                socket.emit(
                    "chat-response",
                    socketResponse(
                        false,
                        "Failed",
                        null,
                        null,
                        true,
                        error.message
                    )
                )

            }
        })

    })

}

export default offlineChatRoute