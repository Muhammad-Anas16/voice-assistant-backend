const responseHandler = (
    res,
    statusCode,
    success,
    message,
    userSay = null,
    AiReply = null,
    error = false,
    errorMessage = null
) => {

    return res.status(statusCode).json({
        success,
        message,
        userSay,
        AiReply,
        error,
        errorMessage
    })

}

export default responseHandler