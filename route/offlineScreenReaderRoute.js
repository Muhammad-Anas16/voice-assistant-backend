import saveScreenCapturorFile from "../components/saveScreenCapturorFile.js";
import socketResponse from "../components/socketResponse.js";
import AIReplyWithGroq from "../helperFunction/AIReplyWithGroq.js";
import OCRService from "../services/OCRService.js";

const offlineScreenReaderRoute = (io) => {
    io.on("connection", (socket) => {
        socket.on("online-screen-read", async (data) => {
            let filePath = "";
            try {
                // Save Screenshot
                filePath = saveScreenCapturorFile(data.chunk);
                // OCR
                const extractedText = await OCRService(filePath);
                // AI
                const aiReply = await AIReplyWithGroq(extractedText);
                socket.emit(
                    "online-screen-read-response",
                    socketResponse(
                        true,
                        "Screen Read Successfully",
                        extractedText,
                        aiReply
                    )
                );
            } catch (error) {
                socket.emit(
                    "online-screen-read-response",
                    socketResponse(
                        false,
                        "Failed",
                        null,
                        null,
                        true,
                        error.message
                    )
                );
            }
        });
    });
};

export default offlineScreenReaderRoute;