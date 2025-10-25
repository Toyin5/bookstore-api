import { Model, DataTypes, Optional } from 'sequelize';
import { IBook } from '../interfaces/IBook';
import {sequelize} from '../database/sequelize';


type BookAttributes = Optional<
  IBook,
  | 'id'
  >;

class Book extends Model<BookAttributes> {
  declare id: number;
  declare uuid: string;
    declare title: string;
    declare author: string;
    declare isbn: string;
    declare description: string;
    declare genre: string;
    declare price: number;
    declare stock: number;
    declare created_at: Date
    declare updated_at: Date
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    uuid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4()
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
        unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    genre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
  },
  {
    sequelize,
    tableName: 'books',
    timestamps: false
  }
);

export default Book;