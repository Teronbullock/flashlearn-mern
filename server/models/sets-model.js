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
  title: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    defaultValue: 'No description added',
  },
});

(async () => {
  try {
    await Sets.sync({ alter: true });
    console.log('The Sets model table is synced');
  } catch (error) {
    console.log('Error: The Sets model table was not synced.', error);
  }
})();

export default Sets;
