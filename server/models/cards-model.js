import { DataTypes } from 'sequelize';
import db from '../db/database.js';
import Users from './users-model.js';
import Sets from './sets-model.js';

const Card = db.define('fc_card', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
  },
  auth_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Users,
      key: 'auth_id',
    },
  },
  set_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Sets,
      key: 'id',
    },
  },
  term: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  definition: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  bg_color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text_color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  try {
    await Card.sync({ alter: true });
    console.log('The Card model table is synced');
  } catch (error) {
    console.log('Error: The Card model table was not synced.', error);
  }
})();

export default Card;
