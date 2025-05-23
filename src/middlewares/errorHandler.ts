import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../common/utils/AppError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  if (err instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format, check your request body",
      error: err?.message || "Unknown",
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      error: err.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Something went wrong",
    error: err?.message || "Unknown",
  });
};
