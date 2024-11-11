import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import { ReturnService } from "./return.services";

const returnBook = catchAsync(async (req: Request, res: Response) => {
  const result = await ReturnService.returnBookInDB(req.body.borrowId);
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Book returned successfully",
  });
});

export const ReturnControllers = {
  returnBook,
};
