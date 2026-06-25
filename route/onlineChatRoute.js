import fs from "fs"
import path from "path"
import speechToText from "../components/speechToText.js"
import socketResponse from "../components/socketResponse.js"
import { deleteAudioFiles } from "../components/deleteAudioFiles.js"
import AIReplyWithGroq from "../helperFunction/AIReplyWithGroq.js"
import saveAudioFile from "../components/saveAudioFile.js"

const onlineChatRoute = (io) => {

    io.on("connection", (socket) => {

        socket.on("online-chat", async (data) => {

            let filePath = ""

            try {
                // for saving audio files into upload folder
                filePath = saveAudioFile(data.chunk)
                // get Clean filer converted ted
                const cleanText = await speechToText(filePath)
                // converted text to AI for getting response
                const reply = await AIReplyWithGroq(cleanText)

                socket.emit(
                    "chat-response",
                    socketResponse(
                        true,
                        "Online Response Generated",
                        cleanText,
                        reply
                    )
                )

                if (reply) {
                    setTimeout(() => deleteAudioFiles(filePath), 1000)
                }

            } catch (error) {

                socket.emit(
                    "online-chat-response",
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

export default onlineChatRoute