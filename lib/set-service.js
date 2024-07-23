import RefreshTokens from '../models/refresh-token-model.js';

export const addRefreshToken = async (userId, refreshToken) => {
  try {
    await RefreshTokens.create({
      user_id: userId,
      token: refreshToken,
    });
  } catch (error) {
    console.log('Error adding refresh token: ', error);
  }
};

export const deleteRefreshToken = async userId => {
  const deletedCount = await RefreshTokens.destroy({
    where: { user_id: userId },
  });

  return deletedCount;
};
