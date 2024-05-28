const constants=require("../errorCodes")
const errorHandler = async (err, req, res, next) => {
    const statusCode = res.statuscode ?? 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation error",
                message: err.message,
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized user",
                message: err.message,
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not found",
                message: err.message,
            });
            break;
        case constants.INTERNAL_SERVER_ERROR:
            res.json({
                title: "Internal server error",
                message: err.message,
            });
            break;
        default:
            console.log("Everything is fine");
            break;
    }
}
module.exports = errorHandler;