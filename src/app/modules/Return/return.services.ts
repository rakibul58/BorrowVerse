import { PrismaClient } from "@prisma/client";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const returnBookInDB = async (borrowId: string) => {
  const isBorrowRecordExists = await prisma.borrowRecord.findUnique({
    where: {
      borrowId,
    },
  });

  if (!isBorrowRecordExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid borrowRecord ID");
  }

  if (isBorrowRecordExists.returnDate !== null) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Book Is Already Returned");
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    const currentDate = new Date();
    const updateBorrowRecord = await transactionClient.borrowRecord.update({
      where: { borrowId },
      data: {
        returnDate: currentDate,
      },
    });

    await transactionClient.book.update({
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
  });

  return result;
};

export const ReturnService = {
  returnBookInDB,
};
