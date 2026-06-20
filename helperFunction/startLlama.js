import { spawn } from "child_process";

let llamaProcess = null;

export function startLlamaServer() {
    if (llamaProcess) {
        console.log("llama-server already running...");
        return;
    }

    console.log("Starting llama-server...");

    llamaProcess = spawn(
        "llama-server",
        [
            "-hf",
            "ggml-org/gemma-3-1b-it-GGUF",
            "--port",
            "8080",
            "--threads",
            "4",
            "--ctx-size",
            "1024"
        ],
        {
            shell: true,
            stdio: "inherit"
        }
    );

    llamaProcess.on("close", (code) => {
        console.log("llama-server stopped with code:", code);
        llamaProcess = null;
    });
}