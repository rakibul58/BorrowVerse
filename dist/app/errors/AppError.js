"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    // using Error class and creating custom throw error class
    constructor(status, message, stack = "") {
        super(message);
        this.status = status;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = AppError;
