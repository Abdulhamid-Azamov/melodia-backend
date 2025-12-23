export function errorHandle(err, _req, res, _next) {
    const statusCode = err?.statusCode || 500;
    const message = err?.message || 'Internal server error';
    if (!err?.statusCode) {
        console.log(err);
    }
    return res.status(statusCode).json({
        statusCode,
        message
    });
}