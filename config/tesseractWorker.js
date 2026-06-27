import { createWorker } from "tesseract.js";

const worker = await createWorker("eng");

export default worker;