import { Request, Response, NextFunction, } from 'express';
import { z, ZodError } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const isProd = process.env.NODE_ENV === 'production';

  let status = err.status ?? 500;
  let code = err.code ?? 'INTERNAL_SERVER_ERROR';
  let message = err.message ?? 'An unexpected error occurred';
  let isSafe = err.isOperational ?? false;

  let details: ReturnType<typeof z.treeifyError> | null = null;

  if (err instanceof ZodError) {
    status = 400;
    code = 'VALIDATION_ERROR';
    message = 'Validation Error';
    isSafe = true;
    details = z.treeifyError(err);
  }

  console.log("Server Error:", {
    timestamp: new Date().toUTCString(),
    status,
    code,
    originalMessage: err.message,
    cause: err.cause,
    path: req.originalUrl,
    stack: err.stack,
    ...(details && { details }),
  });

  res.status(status).json({
    success: false,
    error: {
      status,
      code,
      message: (isSafe || !isProd) ? message : 'An unexpected error occurred',
      ...(details && { details }),
      ...(!isProd && { stack: err.stack }),
    },
  });
};
