import { Member, PrismaClient } from "@prisma/client";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
const prisma = new PrismaClient();

const createMemberIntoDB = async (payload: Member) => {
  const result = await prisma.member.create({ data: payload });
  return result;
};

const getAllMembersFromDB = async () => {
  const result = await prisma.member.findMany();
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "No Members Found");
  }
  return result;
};

const getMemberByIdFromDB = async (memberId: string) => {
  const result = await prisma.member.findUnique({
    where: {
      memberId,
    },
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid member ID");
  }

  return result;
};

export const MemberServices = {
  createMemberIntoDB,
  getAllMembersFromDB,
  getMemberByIdFromDB
};
