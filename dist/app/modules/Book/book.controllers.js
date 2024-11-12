"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const book_services_1 = require("./book.services");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
// Book controllers
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_services_1.BookServices.createBookIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: http_status_codes_1.StatusCodes.CREATED,
        message: "Book created successfully",
        data: result,
    });
}));
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_services_1.BookServices.getAllBooksFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: "Books retrieved successfully",
        data: result,
    });
}));
const getBookByBookId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_services_1.BookServices.getBookByBookIdFromDB(req.params.bookId);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: "Book retrieved successfully",
        data: result,
    });
}));
const updateBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_services_1.BookServices.updateBookByIdInDB(req.params.bookId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: "Book updated successfully",
        data: result,
    });
}));
const deleteBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield book_services_1.BookServices.deleteBookByIdInDB(req.params.bookId);
    (0, sendResponse_1.default)(res, {
        success: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: "Book successfully deleted",
    });
}));
exports.BookControllers = {
    createBook,
    getAllBooks,
    getBookByBookId,
    updateBookById,
    deleteBookById,
};
