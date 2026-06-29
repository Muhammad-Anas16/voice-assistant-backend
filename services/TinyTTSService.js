import fs from "fs";
import TinyTTS from "tiny-tts";

const tts = new TinyTTS();

const TinyTTSService = async (text) => {
    const outputPath = "uploads/output.wav";

    await tts.speak(text, outputPath);

    const audioBuffer = fs.readFileSync(outputPath);

    return {
        audio: audioBuffer.toString("base64"),
        mimeType: "audio/wav"
    };
};

export default TinyTTSService;