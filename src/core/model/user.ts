import { Model, DataTypes, Optional } from 'sequelize';
import { IUser } from '../interfaces/IUser';
import { sequelize } from '../database/sequelize';

type UserAttributes = Optional<
  IUser,
  'id' | `user_id` | 'first_name' | 'last_name' | 'password' | 'created_at'
>;

class User extends Model<UserAttributes> {
  declare id: number;
  declare user_id: string;
  declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare password: string;
  declare created_at: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
);

export default User;
