import fs from "fs";
import path from "path";
import screenshot from "screenshot-desktop";
import OCRService from "../services/OCRService.js";
import AIReplyWithGroq from "../helperFunction/AIReplyWithGroq.js";

const onlineScreenReaderRoute = (io) => {
    io.on("connection", (socket) => {
        socket.on("online-screen-read", async () => {
            try {
                const folder = path.join(process.cwd(), "screens");

                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder, { recursive: true });
                }

                const fileName = `screen-${Date.now()}.png`;
                const filePath = path.join(folder, fileName);

                const image = await screenshot({
                    format: "png"
                });

                fs.writeFileSync(filePath, image);

                const extractedText = await OCRService(filePath);

                await fs.promises.unlink(filePath);

                const prompt = `
Ye OCR se nikla hua screen text hai:

${extractedText}

Tum ek desktop AI assistant ho.

Tumhara kaam:
1. OCR text ko clean karo.
2. Samjhao screen par kya open hai.
3. User is waqt kya kaam kar raha hai batao.
4. Agar user ko help ki zarurat lagti hai to sirf relevant suggestion do.
5. OCR ki garbage, random symbols aur duplicate text ignore karo.
6. Agar text readable na ho to clearly batao "Screen ka text clear nahi hai."

Short aur natural jawab do.
`;

                const reply = await AIReplyWithGroq(prompt);

                socket.emit("online-screen-read-response", {
                    success: true,
                    message: "Screenshot Saved Successfully",
                    file: fileName,
                    text: extractedText,
                    aiReply: reply
                });

            } catch (err) {
                socket.emit("online-screen-read-response", {
                    success: false,
                    message: err.message
                });
            }
        });
    });
};

export default onlineScreenReaderRoute;