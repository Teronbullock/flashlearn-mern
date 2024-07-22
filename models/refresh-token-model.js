import { DataTypes } from 'sequelize';
import db from '../db/database.js';
import Users from './users-model.js';


const RefreshTokens = db.define('fc_refresh_tokens', {
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
    }
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

(async () => {
  try {
    await RefreshTokens.sync({alter: true});
    console.log('The RefreshTokens model table is synced');
  } catch (error) {
    console.log('Error: The RefreshTokens model table was not synced.', error);
  }
})();

export default RefreshTokens;