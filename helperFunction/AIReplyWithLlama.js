// const getAIReply = async (text) => {
//     const response = await fetch("http://localhost:8080/v1/chat/completions", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             messages: [
//                 { role: "system", content: "You are a helpful assistant." },
//                 { role: "user", content: text }
//             ]
//         })
//     });

//     const data = await response.json();

//     return data.choices?.[0]?.message?.content || "No response";
// }

// export { getAIReply }

const getAIReply = async (text) => {
    try {
        const response = await fetch(
            "http://localhost:8080/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant."
                        },
                        {
                            role: "user",
                            content: text
                        }
                    ]
                })
            }
        )

        const data = await response.json()

        return data?.choices?.[0]?.message?.content || "No response"

    } catch (error) {

        console.log(error)

        return "Llama server not available"
    }
}

export { getAIReply }