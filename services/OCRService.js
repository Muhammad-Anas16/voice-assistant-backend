import sharp from "sharp";
import worker from "../config/tesseractWorker";

const OCRService = async (filePath) => {

    try {

        const processedImage = await sharp(filePath)
            .grayscale()
            .normalize()
            .sharpen()
            .png()
            .toBuffer();

        const {
            data: { text }
        } = await worker.recognize(processedImage);

        return text.trim();

    } catch (error) {

        throw new Error(`OCR Failed: ${error.message}`);

    }

};

export default OCRService;