import { exec } from "child_process";

export const transcribeAudio = (audioPath, callback) => {
    const command =
        `whisper.cpp\\build\\bin\\Release\\whisper-cli.exe ` +
        `-m whisper.cpp\\ggml-tiny.en.bin ` +
        `-f "${audioPath}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            callback(error, null);
            return;
        }

        // ✅ IMPORTANT FIX:
        // Whisper final text usually comes after last timestamp line
        const lines = stdout
            .split("\n")
            .filter(l => l.trim() !== "");

        let transcript = "";

        for (const line of lines) {
            // only keep spoken text lines (not logs)
            if (line.includes("[") && line.includes("]")) {
                const text = line.split("]").pop().trim();
                if (text) {
                    transcript += text + " ";
                }
            }
        }

        transcript = transcript.trim();

        callback(null, transcript || stdout); // fallback safety
    });
};