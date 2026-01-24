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
    type: DataTypes.UUID,
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


export default RefreshTokens;