import { Request, Response, NextFunction } from "express";

type AsynController = (
  req: Request,
  res: Response,
  nex: NextFunction
) => Promise<any>;

export const asyncHandler =
  (controller: AsynController): AsynController =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
