import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  console.error(`Error occured on PATH: ${req.path}`, err);
  return res.status(500).json({
    message: "Something went wrong",
    error: err?.message || "Unknown",
  });
};
