import { DataTypes } from 'sequelize';
import db from '../db/database.js';
import Users from './users-model.js';

const Sets = db.define('fc_sets', {
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
    },
  },
  title: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    defaultValue: 'No description added',
  },
});

export default Sets;
