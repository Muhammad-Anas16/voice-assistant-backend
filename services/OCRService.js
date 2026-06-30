import sharp from "sharp";
import worker from "../config/tesseractWorker.js";

const OCRService = async (filePath) => {
    try {
        console.log("OCR Started...");

        const processedImage = await sharp(filePath)
            .grayscale()
            .normalize()
            .sharpen()
            .png()
            .toBuffer();

        const result = await worker.recognize(processedImage);

        console.log("OCR Finished");

        return result.data.text.trim();
    } catch (error) {
        console.error("OCR Error:", error);

        throw new Error(`OCR Failed: ${error.message}`);
    }
};

export default OCRService;