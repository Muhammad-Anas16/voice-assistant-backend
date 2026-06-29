import fs from "fs"
import path from "path"
import socketResponse from "../components/socketResponse.js"
import { deleteAudioFiles } from "../components/deleteAudioFiles.js"
import saveAudioFile from "../components/saveAudioFile.js"
import deepgramSpeechToText from "../components/deepgramOnlineSpeechToText.js"
import AIReplyWithGroq from "../helperFunction/AIReplyWithGroq.js"
import TinyTTSService from "../services/TinyTTSService.js"

const onlineChatRoute = (io) => {

    io.on("connection", (socket) => {

        socket.on("online-chat", async (data) => {

            let filePath = "";
            let audio = "";

            try {
                // for saving audio files into upload folder
                filePath = saveAudioFile(data.chunk)
                // get Clean filer converted ted
                const cleanText = await deepgramSpeechToText(filePath)
                // converted text to AI for getting response
                const reply = await AIReplyWithGroq(cleanText)
                // sending audio to Frontend
                audio = await TinyTTSService(reply);

                socket.emit(
                    "chat-response",
                    socketResponse(
                        true,
                        "Online Route",
                        cleanText,
                        reply,
                        audio
                    )
                )

                if (audio) {
                    deleteAudioFiles(filePath)
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