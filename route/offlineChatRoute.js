import fs from "fs"
import path from "path"
import socketResponse from "../components/socketResponse.js"
import { getAIReply } from "../helperFunction/AIReplyWithLlama.js"
import { startLlamaServer } from "../helperFunction/startLlama.js"
import { deleteAudioFiles } from "../components/deleteAudioFiles.js"
import saveAudioFile from "../components/saveAudioFile.js"
import speechToText from "../components/nodeWhisperSpeechToText.js"

const offlineChatRoute = (io) => {

    io.on("connection", (socket) => {

        socket.on("offline-chat", async (data) => {

            let filePath = ""

            try {
                startLlamaServer()

                // for saving audio files into upload folder
                filePath = saveAudioFile(data.chunk)
                // get Clean filer converted ted
                const cleanText = await speechToText(filePath)
                // converted text to AI for getting response
                const reply = await getAIReply(cleanText)

                socket.emit(
                    "chat-response",
                    socketResponse(
                        true,
                        "Offline Response Generated",
                        cleanText,
                        reply
                    )
                )

                if (reply) {
                    setTimeout(() => deleteAudioFiles(filePath), 2000)
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