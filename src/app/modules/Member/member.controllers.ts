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

const getAllMembers = catchAsync(async (req: Request, res: Response) => {
  const result = await MemberServices.getAllMembersFromDB();
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Members retrieved successfully",
    data: result,
  });
});

const getMemberByMemberId = catchAsync(async (req: Request, res: Response) => {
  const result = await MemberServices.getMemberByIdFromDB(req.params.memberId);
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Member retrieved successfully",
    data: result,
  });
});

const updateMemberById = catchAsync(async (req: Request, res: Response) => {
  const result = await MemberServices.updateMemberByIdInDB(
    req.params.memberId,
    req.body
  );
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Member updated successfully",
    data: result,
  });
});

const deleteMemberById = catchAsync(async (req: Request, res: Response) => {
  await MemberServices.deleteMemberByIdInDB(req.params.memberId);
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Member successfully deleted",
  });
});

export const MemberControllers = {
  createMember,
  getAllMembers,
  getMemberByMemberId,
  updateMemberById,
  deleteMemberById,
};
