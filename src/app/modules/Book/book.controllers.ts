import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BookServices } from "./book.services";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.createBookIntoDB(req.body);
  sendResponse(res, {
    success: true,
    status: StatusCodes.CREATED,
    message: "Book created successfully",
    data: result,
  });
});

export const BookControllers = {
  createBook,
};
