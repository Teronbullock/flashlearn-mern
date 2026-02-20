import express from 'express';
import {z, ZodError } from 'zod';
import { AppError } from '../lib/AppError';

const errorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  let status = 500;
  let code = 'INTERNAL_SERVER_ERROR';
  let message = 'An unexpected error occurred';
  let details: Record<string, string[]> | null = null;
  let isSafe = err.isOperational || false;

  console.error('last stop: ', err);

  if (err instanceof AppError) {
    status = err.status;
    code = err.code;
    message = err.message;
    isSafe = err.isOperational;
    
  } else if (err instanceof ZodError) {
    status = 400;
    message = 'Validation Error';
    code = 'VALIDATION_ERROR';
    isSafe = true;
    details = z.flattenError(err).fieldErrors;
  }

  // Log the error details
  console.log("Server Error:",
    {
      timestamp: new Date().toUTCString(),
      message,
      ...(!isSafe && err.message && { rawMessage: err.message }),
      ...(details && { details }),
      ...(!isSafe && err.cause && { cause: err.cause }),
      request: {
        method: req.method,
        url: req.url,
        path: req.path,
      },
      error: {
        name: err.name,
        status,
        code,
        stack: err.stack,
      },
    });

  
  // sends res to client
  res.status(status).json({
    success: false,
    error: {
      status,
      code,
      message: isSafe ? message : 'An unexpected error occurred', 
      ...(details && {details}),
    },
  });

};

export default errorHandler;