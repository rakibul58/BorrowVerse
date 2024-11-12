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
exports.BorrowServices = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma = new client_1.PrismaClient();
const borrowBooksFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isMemberExists = yield prisma.member.findUnique({
        where: {
            memberId: payload.memberId,
        },
    });
    if (!isMemberExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid member ID");
    }
    const isBookExists = yield prisma.book.findUnique({
        where: {
            bookId: payload.bookId,
        },
    });
    // checking if the book exists
    if (!isBookExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid book ID");
    }
    // checking if the book is available
    if (isBookExists.availableCopies <= 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "No available copies");
    }
    // running transaction as multiple query write operations happening
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const currentDate = new Date();
        const borrowRecordData = Object.assign(Object.assign({}, payload), { borrowDate: currentDate });
        const createBorrowRecordData = yield transactionClient.borrowRecord.create({
            data: borrowRecordData,
        });
        // decrementing available copies as book is borrowed
        yield transactionClient.book.update({
            where: {
                bookId: isBookExists.bookId,
            },
            data: {
                availableCopies: {
                    decrement: 1,
                },
            },
        });
        return createBorrowRecordData;
    }));
    return result;
});
const getOverdueBooksFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const borrowedDateOfFourteenDaysAgo = new Date(currentDate);
    borrowedDateOfFourteenDaysAgo.setDate(currentDate.getDate() - 14);
    // running the raw query to get the data in expected format and without looping through whole data
    const result = yield prisma.$queryRaw `
  SELECT 
  borrow."borrowId",
  books."title" AS "bookTitle",
  members."name" AS "borrowerName",
    GREATEST(DATE_PART('day', NOW() - borrow."borrowDate") - 14, 0) AS "overdueDays"
  FROM "borrow" 
  JOIN "books"  ON borrow."bookId" = books."bookId"
  JOIN "members" ON borrow."memberId" = members."memberId"
  WHERE 
  borrow."returnDate" IS NULL 
    AND borrow."borrowDate" < NOW() - INTERVAL '14 days';
`;
    return result;
});
exports.BorrowServices = {
    borrowBooksFromDB,
    getOverdueBooksFromDB,
};
