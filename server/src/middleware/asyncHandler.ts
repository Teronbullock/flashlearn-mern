import { Request, Response, NextFunction, RequestHandler } from "express";
import { AuthRequest } from "../types";
import { AppError } from "../lib/AppError";

/**
 *  -- Async Handler --
 * This function will handle async errors via the try catch block
 * and pass them to the error handling middleware.
 *
 * The CB is ran asynchronously, if there is an error it will
 * be passed to the error handling middleware, otherwise the
 * callback will be called.
 *
 * @param {*} cb - The callback function to call.
 * @param {*} errStatus - The error status to display.
 * @returns
 */

type Controller<T extends Request = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<unknown> | void;

export const asyncHandler = <T extends Request = Request>(
  cb: Controller<T>,
  errStatus: number = 500
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req as T, res, next);
    } catch (err) {
      if (err instanceof Error) {
        err.status ??= errStatus;
      }

      next(err);
    };
  };
}
