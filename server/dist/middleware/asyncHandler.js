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
const asyncHandler = (cb, errStatus) => {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        }
        catch (err) {
            err.status = err.status || errStatus;
            next(err);
        }
    };
};
export default asyncHandler;
//# sourceMappingURL=asyncHandler.js.map