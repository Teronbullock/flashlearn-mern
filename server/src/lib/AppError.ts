interface AppErrorArgs {
  message: string;
  status?: number;
  code?: string;
  cause?: unknown;
  isOperational?: boolean;
}

export class AppError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(args: AppErrorArgs) {
    super(args.message);
    this.status = args.status ?? 500;
    this.code = args.code ?? 'INTERNAL_SERVER_ERROR';
    this.isOperational = args.isOperational ?? true;
    this.cause = args.cause;

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}