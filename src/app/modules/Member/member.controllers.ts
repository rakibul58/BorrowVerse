import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { MemberServices } from "./member.services";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";

const createMember = catchAsync(async (req: Request, res: Response) => {
  const result = await MemberServices.createMemberIntoDB(req.body);
  sendResponse(res, {
    success: true,
    status: StatusCodes.CREATED,
    message: "Member created successfully",
    data: result,
  });
});

export const MemberControllers = {
  createMember,
};
