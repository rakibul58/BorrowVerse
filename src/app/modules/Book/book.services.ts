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
  // checking if any book exists
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "No Books Found");
  }
  return result;
};

const getBookByBookIdFromDB = async (bookId: string) => {
  const result = await prisma.book.findUnique({
    where: {
      bookId,
    },
  });

  // checking if book exists for given Id
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid book ID");
  }

  return result;
};

const updateBookByIdInDB = async (bookId: string, payload: Partial<Book>) => {
  const isBookExists = await prisma.book.findUnique({
    where: {
      bookId,
    },
  });
  if (!isBookExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid book ID");
  }

  const result = await prisma.book.update({
    where: { bookId },
    data: payload,
  });

  return result;
};

const deleteBookByIdInDB = async (bookId: string) => {
  const isBookExists = await prisma.book.findUnique({
    where: {
      bookId,
    },
  });
  if (!isBookExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid book ID");
  }

  const result = await prisma.book.delete({
    where: { bookId },
  });

  return result;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getBookByBookIdFromDB,
  updateBookByIdInDB,
  deleteBookByIdInDB
};
