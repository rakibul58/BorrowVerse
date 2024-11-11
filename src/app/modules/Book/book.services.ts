import { Book, PrismaClient } from "@prisma/client";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
const prisma = new PrismaClient();

const createBookIntoDB = async (payload: Book) => {
  const result = await prisma.book.create({ data: payload });
  return result;
};

const getAllBooksFromDB = async () => {
  const result = await prisma.book.findMany();
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "No Books Found");
  }
  return result;
};

const getBookByBookId = async (bookId: string) => {
  const result = await prisma.book.findUnique({
    where: {
      bookId,
    },
  });

  if(!result){
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid book ID")
  }

  return result;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getBookByBookId
};
