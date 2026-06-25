import fs from "fs"
import path from "path"

const saveAudioFile = (chunk) => {
    const buffer = Buffer.from(chunk)

    const filePath = path.join(
        process.cwd(),
        "uploads",
        `audio-${Date.now()}.webm`
    )

    fs.writeFileSync(filePath, buffer)

    return filePath
}

export default saveAudioFile