import { DataTypes } from 'sequelize';
import db from '../db/database.js';
import Users from './users-model.js';
import Sets from './sets-model.js';
const Cards = db.define('fc_cards', {
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
export default Cards;
//# sourceMappingURL=cards-model.js.map