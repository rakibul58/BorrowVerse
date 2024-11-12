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

const getOverdueBooksFromDB = async (): Promise<IOverdueResponse[] | []> => {
  const currentDate = new Date();
  const borrowedDateOfFourteenDaysAgo = new Date(currentDate);
  borrowedDateOfFourteenDaysAgo.setDate(currentDate.getDate() - 14);

  const result: IOverdueResponse[] = await prisma.$queryRaw`
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
};

export const BorrowServices = {
  borrowBooksFromDB,
  getOverdueBooksFromDB,
};
