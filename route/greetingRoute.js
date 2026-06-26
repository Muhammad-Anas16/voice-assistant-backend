import express from "express"
import { getAIReply } from "../helperFunction/AIReplyWithLlama.js"
import AIReplyWithGroq from "../helperFunction/AIReplyWithGroq.js"
import responseHandler from './../components/responseHandler.js';
import { startLlamaServer } from "../helperFunction/startLlama.js";

const router = express.Router()

router.post("/greeting", async (req, res) => {
    try {

        const {
            assistantName,
            userName,
            country,
            language,
            religion,
            mode
        } = req.body

        const prompt = `
Assistant Name: ${assistantName}

User Name: ${userName} Country: ${country} Language: Roman ${language} in English spell Religion: ${religion} Introduce yourself briefly and greet the user.
Do not use markdown.
Do not use bullet points.
Respond in a single natural 1 line or 2 lines paragraph.`

            let reply;

        if (mode === "offline") {
            startLlamaServer()
        }

        if (mode === "offline") {
            reply = await getAIReply(prompt)
        } else {
            reply = await AIReplyWithGroq(prompt)
        }

        const filterReply = reply.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim()

        return responseHandler(
            res,
            200,
            true,
            "Greeting Generated",
            null,
            filterReply,
            false,
            null
        )

    } catch (error) {

        return responseHandler(
            res,
            500,
            false,
            "Failed To Generate Greeting",
            null,
            null,
            true,
            error.message
        )
    }
})

export default router