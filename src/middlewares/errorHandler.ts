import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";

export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  if (err instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format, check your request body",
      error: err?.message || "Unknown",
    });
  }

  console.error(`Error occured on PATH: ${req.path}`, err);
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Something went wrong",
    error: err?.message || "Unknown",
  });
};
