// This Function sends success response
export const successResponse = (res, statusCode, message, data) => {
    const response = {
        "statusCode": statusCode || 200,
        "status": true,
        "message": message || '',
        "data": data || {}
    }
    res.status(statusCode || 200).json(response);
}

// This Function sends error response
export const errorResponse = (res, statusCode, message) => {
    const response = {
        "statusCode": statusCode || 500,
        "status": false,
        "message": message || 'Internal server error'
    }
    res.status(statusCode || 500).json(response);
}