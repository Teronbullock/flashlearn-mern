export class AppError extends Error {
    status;
    code;
    isOperational;
    constructor(args) {
        super(args.message);
        this.status = args.status ?? 500;
        this.code = args.code ?? 'INTERNAL_SERVER_ERROR';
        this.isOperational = args.isOperational ?? true;
        this.cause = args.cause;
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=AppError.js.map