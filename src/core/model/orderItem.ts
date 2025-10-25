import {
  Model,
  DataTypes,
  Optional,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
} from 'sequelize';
import { sequelize } from '../database/sequelize';
import IOrderItem from '../interfaces/IOrderItem';
import Order from './order';
import Book from './book';

type OrderItemAttributes = Optional<IOrderItem, 'id' | 'order_item_id'>;

interface OrderItemInterface extends Model<OrderItemAttributes> {
  id: number;
  order_item_id: string;
  order_id: string;
  book_id: string;
  quantity: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  // Association mixins
  getOrder: BelongsToGetAssociationMixin<Order>;
  getBook: BelongsToGetAssociationMixin<Book>;
}

class OrderItem extends Model<OrderItemAttributes> implements OrderItemInterface {
  declare id: number;
  declare order_item_id: string;
  declare order_id: string;
  declare book_id: string;
  declare quantity: number;
  declare price: number;
  declare created_at: Date;
  declare updated_at: Date;

  // Association mixins
  declare getOrder: BelongsToGetAssociationMixin<Order>;
  declare getBook: BelongsToGetAssociationMixin<Book>;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    order_item_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'order_id',
      },
    },
    book_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'books',
        key: 'book_id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'order_items',
    timestamps: false,
  }
);

export default OrderItem;
