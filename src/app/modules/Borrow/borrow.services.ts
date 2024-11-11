import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";

const prisma = new PrismaClient();

const borrowBooksFromDB = async (payload: IBorrowPayload) => {
  const isMemberExists = await prisma.member.findUnique({
    where: {
      memberId: payload.memberId,
    },
  });

  if (!isMemberExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid member ID");
  }

  const isBookExists = await prisma.book.findUnique({
    where: {
      bookId: payload.bookId,
    },
  });

  if (!isBookExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid book ID");
  }

  if (isBookExists.availableCopies <= 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "No available copies");
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    const currentDate = new Date();
    const borrowRecordData = { ...payload, borrowDate: currentDate };
    const createBorrowRecordData = await transactionClient.borrowRecord.create({
      data: borrowRecordData,
    });

    await transactionClient.book.update({
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
  });

  return result;
};

export const BorrowServices = {
  borrowBooksFromDB,
};
