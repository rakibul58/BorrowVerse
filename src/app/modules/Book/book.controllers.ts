import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BookServices } from "./book.services";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

// Book controllers
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
  const result = await BookServices.getBookByBookIdFromDB(req.params.bookId);
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Book retrieved successfully",
    data: result,
  });
});

const updateBookById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.updateBookByIdInDB(
    req.params.bookId,
    req.body
  );
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBookById = catchAsync(async (req: Request, res: Response) => {
  await BookServices.deleteBookByIdInDB(req.params.bookId);
  sendResponse(res, {
    success: true,
    status: StatusCodes.OK,
    message: "Book successfully deleted",
  });
});

export const BookControllers = {
  createBook,
  getAllBooks,
  getBookByBookId,
  updateBookById,
  deleteBookById,
};
