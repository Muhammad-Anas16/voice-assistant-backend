import { nodewhisper } from "nodejs-whisper"

const speechToText = async (filePath) => {

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

    return result
        .replace(/\[.*?\]/g, "")
        .replace(/\r?\n/g, " ")
        .replace(/\s+/g, " ")
        .trim()
}

export default speechToText