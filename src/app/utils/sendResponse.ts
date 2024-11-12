import { Response } from "express";

type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

type TResponse<T> = {
  status: number;
  success: boolean;
  message: string;
  meta?: TMeta;
  data?: T;
};

// utility function to handle response
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.status).json({
    success: data?.success,
    status: data?.status,
    message: data?.message,
    meta: data?.meta,
    data: data?.data,
  });
};

export default sendResponse;
