import fs from "fs"
import path from "path"

export const deleteAudioFiles = (fullPath) => {
    try {

        const fileName = path.basename(fullPath)
        const baseName = fileName.replace(".webm", "")

        const uploadDir = path.join(process.cwd(), "uploads")

        const webmFile = path.join(uploadDir, `${baseName}.webm`)
        const txtFile = path.join(uploadDir, `${baseName}.wav.txt`)

        if (fs.existsSync(webmFile)) {
            fs.unlinkSync(webmFile)
            console.log("Deleted:", webmFile)
        }

        if (fs.existsSync(txtFile)) {
            fs.unlinkSync(txtFile)
            console.log("Deleted:", txtFile)
        }

    } catch (err) {
        console.log("Cleanup failed:", err.message)
    }
}