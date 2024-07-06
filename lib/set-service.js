import Cards from '../models/cards-model.js';
import Sets from '../models/sets-model.js';

/**
 *  -- get cards by set id
 * 
 * @param { number } setId 
 * @param { number } userId 
 * @returns 
 */
export const getCardsBySetID = async (setId, userId) => {
  const {count, rows } = await Cards.findAndCountAll({
    raw: true,
    where: { user_id: userId, set_id: setId },
  });

  let cards = rows;
  let cardCount = count;

  return { cards, cardCount };
};

/**
 * -- check for set --
 * 
 * @param { number } setId 
 * @param { number } userId 
 * @returns 
 */
export const checkForSet = async (setId, userId) => {
  console.log('checkForSet: ', setId, userId);
  const set = await Sets.findByPk(setId, { raw: true });

  if (!set) {
    const err = new Error('Set not found');
    err.status = 404;
    throw err;
  }

  if (set.user_id !== userId) {
    const err = new Error('Your not authorized to edit this set');
    err.status = 403;
    throw err;
  }

  return true;
};

/**
 * -- delete cards by set id --
 * 
 * @param { number } setId 
 * @param { number } userId 
 */
export const deleteCardsBySetID = async (setId, userId) => {
  await Cards.destroy({
    where: { user_id: userId, set_id: setId },
  });
};