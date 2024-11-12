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
exports.ReturnService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const returnBookInDB = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    const isBorrowRecordExists = yield prisma.borrowRecord.findUnique({
        where: {
            borrowId,
        },
    });
    if (!isBorrowRecordExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid borrowRecord ID");
    }
    if (isBorrowRecordExists.returnDate !== null) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Book Is Already Returned");
    }
    // running transaction as multiple write operation is happening
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const currentDate = new Date();
        const updateBorrowRecord = yield transactionClient.borrowRecord.update({
            where: { borrowId },
            data: {
                returnDate: currentDate,
            },
        });
        // updating available copies because book is returned
        yield transactionClient.book.update({
            where: {
                bookId: updateBorrowRecord.bookId,
            },
            data: {
                availableCopies: {
                    increment: 1,
                },
            },
        });
        return updateBorrowRecord;
    }));
    return result;
});
exports.ReturnService = {
    returnBookInDB,
};
