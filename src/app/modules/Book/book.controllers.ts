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

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.getAllBooksFromDB();
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Books retrieved successfully",
    data: result,
  });
});

const getBookByBookId = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.getBookByBookId(req.params.id);
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Book retrieved successfully",
    data: result,
  });
});

export const BookControllers = {
  createBook,
  getAllBooks,
  getBookByBookId,
};
