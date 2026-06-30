import { createWorker } from "tesseract.js";

console.log("Creating Tesseract Worker...");

const worker = await createWorker("eng");

console.log("Tesseract Worker Ready");

export default worker;