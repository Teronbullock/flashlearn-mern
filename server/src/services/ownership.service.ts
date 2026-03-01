import { findResourceById } from "../dal/resource.dal";
import { AppError } from "../lib/AppError";

/**
 * Checks if a user owns a specific resource.
 * 
 * @param {Model} model - The DB model (e.g., CardsTable, SetsTable).
 * @param {string|number} resourceId - The ID of the resource to check.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} - The found resource.
 * @throws {Error} - If resource not found or unauthorized.
 */
export const verifyResourceOwnership = async (model, resourceId, userId) => {

  const resource = await findResourceById(model, resourceId);

  if (!resource) {
    throw new AppError({
      message: 'Resource not found',
      status: 404
    });

  }

  if (resource.userId !== userId.toString()) {
    throw new AppError({
      message: 'Unauthorized: You do not own this resource',
      status: 403
    });
  }

  return resource;
};
