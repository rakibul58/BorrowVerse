"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = require("./app/middlewares/notFound");
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// application routes
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send({
        Message: "Library Management System server is running."
    });
});
// using middleware to check if the route doesn't exists
app.use(globalErrorHandler_1.default);
app.use(notFound_1.notFound);
exports.default = app;
