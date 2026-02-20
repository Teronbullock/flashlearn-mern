interface AppErrorArgs {
  message: string;
  status?: number;
  code?: string;
  cause?: any;
  isOperational?: boolean;
}

export class AppError extends Error {
  public status: number;
  public code: string;
  public isOperational: boolean;
  public override cause: any;

  constructor({message, status = 500, code = 'INTERNAL_ERROR', cause = null, isOperational = true} : AppErrorArgs) {
    super(message);
    this.status = status;
    this.code = code;
    this.cause = cause;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}