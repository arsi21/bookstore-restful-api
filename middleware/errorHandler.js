const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    const errorResponse = {
        error: {
            title: "Server Error",
            message: err.message,
            stackTrace: err.stack,
        }
    };

    switch (statusCode) {
        case 400:
            errorResponse.error.title = "Bad Request";
            break;
        case 401:
            errorResponse.error.title = "Unauthorized";
            break;
        case 403:
            errorResponse.error.title = "Forbidden";
            break;
        case 404:
            errorResponse.error.title = "Not Found";
            break;
        case 500:
            errorResponse.error.title = "Internal Server Error";
            break;
        default:
            console.log("No error!");
            break;
    }

    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;