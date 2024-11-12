"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// utility function to handle try and catch and req, res from controllers
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
};
exports.default = catchAsync;
