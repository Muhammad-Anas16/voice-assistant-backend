const socketResponse = (
    success,
    message,
    userSay = null,
    AiReply = null,
    error = false,
    errorMessage = null
) => {

    return {
        success,
        message,
        userSay,
        AiReply,
        error,
        errorMessage
    }

}

export default socketResponse