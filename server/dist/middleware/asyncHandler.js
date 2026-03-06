export const asyncHandler = (cb, errStatus = 500) => {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        }
        catch (err) {
            if (err instanceof Error) {
                err.status ??= errStatus;
            }
            next(err);
        }
        ;
    };
};
//# sourceMappingURL=asyncHandler.js.map