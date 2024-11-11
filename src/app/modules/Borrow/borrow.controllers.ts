import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BorrowServices } from "./borrow.services";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";

const borrowBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BorrowServices.borrowBooksFromDB(req.body);
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Book borrowed successfully",
    data: result,
  });
});

export const BorrowControllers = {
  borrowBook,
};
