const sendResponse = (res, statusCode, success, message, data) => {
    res.status(statusCode).json({
        code: statusCode,
        status: success ? 'success' : 'error',
        message: message,
        data,
    });
};

const sendResponsePagination = (res, statusCode, success, message, page, limit, totalItems, data) => {
    res.status(statusCode).json({
        code: statusCode,
        status: success ? 'success' : 'error',
        page: page,
        limit: limit,
        totalItems: totalItems,
        message: message,
        data,
    });
};

const sendSuccess = (
    res,
    data,
    message = "Success",
    statusCode = 200,
    success = true
) => {
    sendResponse(res, statusCode, success, message, data);
};

const sendSuccessGetPaginationData = (
    res,
    page,
    limit,
    totalItems,
    data,
    message = "Success",
    statusCode = 200,
    success = true
) => {
    sendResponsePagination(res, statusCode, success, message, page, limit, totalItems, data);
};

const sendError = (
    res,
    message = "An error occurred",
    statusCode = 500,
    success = false
) => {
    sendResponse(res, statusCode, success, message, null);
};

module.exports = {
    sendResponse,
    sendSuccess,
    sendError,
    sendSuccessGetPaginationData
};