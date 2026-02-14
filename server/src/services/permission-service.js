import { db } from "../db/database";
import { eq } from "drizzle-orm";

/**
 * Checks if a user owns a specific resource.
 * 
 * @param {Model} model - The Sequelize model (e.g., CardsTable, SetsTable).
 * @param {string|number} resourceId - The ID of the resource to check.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} - The found resource.
 * @throws {Error} - If resource not found or unauthorized.
 */
export const checkResourceOwnership = async (model, resourceId, userId) => {

  const [resource] = await db.select().from(model).where(eq(model.id, resourceId)).limit(1);

  if (!resource) {
    const err = new Error('Resource not found');
    err.status = 404;
    throw err;
  }

  if (resource.userId !== userId.toString()) {
    const err = new Error('Unauthorized: You do not own this resource');
    err.status = 403;
    throw err;
  }

  return resource;
};
