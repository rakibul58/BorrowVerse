/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import AppError from "../errors/AppError";
import handleDuplicateError from "../errors/handleDuplicateError";

// Explicitly define `globalErrorHandler` as an ErrorRequestHandler
const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  // console.log(err.statusCode);

  // Setting default values
  let statusCode = 500;
  let message = "Something went wrong!";

  if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.status;
    message = simplifiedError?.message;
  } else if (err instanceof AppError) {
    statusCode = err?.status;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  // Send the response without returning the Response object
  res.status(statusCode).json({
    success: false,
    message,
    status: statusCode,
  });

  // Explicitly return `void`
  return;
};

export default globalErrorHandler;
