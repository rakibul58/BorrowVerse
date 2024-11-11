import { Member, PrismaClient } from "@prisma/client";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
const prisma = new PrismaClient();

const createMemberIntoDB = async (payload: Member) => {
  const result = await prisma.member.create({ data: payload });
  return result;
};

export const MemberServices = {
  createMemberIntoDB,
};
