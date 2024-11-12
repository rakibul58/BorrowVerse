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
exports.BookServices = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const createBookIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.create({ data: payload });
    return result;
});
const getAllBooksFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.findMany();
    // checking if any book exists
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "No Books Found");
    }
    return result;
});
const getBookByBookIdFromDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.findUnique({
        where: {
            bookId,
        },
    });
    // checking if book exists for given Id
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid book ID");
    }
    return result;
});
const updateBookByIdInDB = (bookId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookExists = yield prisma.book.findUnique({
        where: {
            bookId,
        },
    });
    if (!isBookExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid book ID");
    }
    const result = yield prisma.book.update({
        where: { bookId },
        data: payload,
    });
    return result;
});
const deleteBookByIdInDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookExists = yield prisma.book.findUnique({
        where: {
            bookId,
        },
    });
    if (!isBookExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid book ID");
    }
    const result = yield prisma.book.delete({
        where: { bookId },
    });
    return result;
});
exports.BookServices = {
    createBookIntoDB,
    getAllBooksFromDB,
    getBookByBookIdFromDB,
    updateBookByIdInDB,
    deleteBookByIdInDB
};
