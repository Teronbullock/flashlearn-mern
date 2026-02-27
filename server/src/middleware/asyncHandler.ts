import { Request, Response, NextFunction } from "express";

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

type Controller = (req: Request, res: Response, next: NextFunction) => Promise<unknown> | void;

type AsyncHandlerArgs = (cb: Controller, errStatus?: number) => Controller;

const asyncHandler: AsyncHandlerArgs = (cb, errStatus) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'status' in err) {
        (err as { status: number | undefined }).status ??= errStatus;
      }

      next(err);
    };
  };
}

export default asyncHandler;
