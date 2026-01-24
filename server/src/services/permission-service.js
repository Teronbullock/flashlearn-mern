/**
 * Checks if a user owns a specific resource.
 * 
 * @param {Model} model - The Sequelize model (e.g., Cards, Sets).
 * @param {string|number} resourceId - The ID of the resource to check.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} - The found resource.
 * @throws {Error} - If resource not found or unauthorized.
 */
export const checkResourceOwnership = async (model, resourceId, userId) => {
  const resource = await model.findByPk(resourceId);

  if (!resource) {
    const err = new Error('Resource not found');
    err.status = 404;
    throw err;
  }

  if (resource.user_id !== userId) {
    const err = new Error('Unauthorized: You do not own this resource');
    err.status = 403;
    throw err;
  }

  return resource;
};
