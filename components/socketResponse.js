const socketResponse = (
    success,
    message,
    userSay = null,
    AiReply = null,
    audio = null,
    error = false,
    errorMessage = null,
    filePath = null
) => {

    return {
        success,
        message,
        userSay,
        AiReply,
        audio,
        error,
        errorMessage
    }

}

export default socketResponse