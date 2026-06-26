import axios from "axios";
import fs from "fs";

const deepgramSpeechToText = async (filePath) => {
    try {

        const audioBuffer = fs.readFileSync(filePath);

        const response = await axios.post(
            "https://api.deepgram.com/v1/listen?model=nova-3&smart_format=true&punctuate=true",
            audioBuffer,
            {
                headers: {
                    Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
                    "Content-Type": "audio/webm"
                }
            }
        );

        const transcript =
            response.data.results.channels[0].alternatives[0].transcript;

        return transcript.trim();

    } catch (error) {

        console.error(
            "Deepgram Error:",
            error.response?.data || error.message
        );

        return "";
    }
};

export default deepgramSpeechToText;