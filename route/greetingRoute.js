import express from "express"
import responseHandler from "../helperFunction/responseHandler.js"

const router = express.Router()

router.post("/greeting", async (req, res) => {
    try {

        const {
            assistantName,
            userName,
            country,
            language,
            religion
        } = req.body

        const prompt = `
Assistant Name: ${assistantName}

User Name: ${userName}

Country: ${country}

Language: ${language}

Religion: ${religion}

Introduce yourself briefly and greet the user.
`

        // const reply = await getAIReply(prompt)

        return responseHandler(
            res,
            200,
            true,
            "Greeting Generated",
            null,
            reply,
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