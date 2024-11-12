"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
// Explicitly define `globalErrorHandler` as an ErrorRequestHandler
const globalErrorHandler = (err, req, res, next) => {
    // console.log(err.statusCode);
    // Setting default values
    let statusCode = 500;
    let message = "Something went wrong!";
    if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        // handling duplicate error
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.status;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
    }
    else if (err instanceof AppError_1.default) {
        // handling if instance of appError custom error class
        statusCode = err === null || err === void 0 ? void 0 : err.status;
        message = err.message;
    }
    else if (err instanceof Error) {
        // handling for normal error
        message = err.message;
    }
    // Send the response without returning the Response object
    res.status(statusCode).json({
        success: false,
        message,
        status: statusCode,
    });
    // Explicitly return `void`
    return;
};
exports.default = globalErrorHandler;
