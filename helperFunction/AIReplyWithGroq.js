import Groq from "groq-sdk";
import 'dotenv/config';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const AIReplyWithGroq = async (userMessage) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: userMessage,
                },
            ],
            model: "openai/gpt-oss-20b",
        });

        return chatCompletion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error("Groq Error:", error);
        return "Error generating reply";
    }
};

export default AIReplyWithGroq;