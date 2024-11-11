import { Book, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createBookIntoDB = async (payload: Book) => {
  const result = await prisma.book.create({ data: payload });
  return result;
};

export const BookServices = {
  createBookIntoDB,
};
