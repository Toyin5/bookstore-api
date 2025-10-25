import {
  Model,
  DataTypes,
  Optional,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import { sequelize } from '../database/sequelize';
import IOrder from '../interfaces/IOrder';
import OrderItem from './orderItem';

type OrderAttributes = Optional<IOrder, 'id' | 'order_id'>;

interface OrderInterface extends Model<OrderAttributes> {
  id: number;
  order_id: string;
  user_id: string;
  total_amount: number;
  created_at: Date;
  updated_at: Date;
  // Association mixins
  getOrderItems: HasManyGetAssociationsMixin<OrderItem>;
  createOrderItem: HasManyCreateAssociationMixin<OrderItem>;
}

class Order extends Model<OrderAttributes> implements OrderInterface {
  declare id: number;
  declare order_id: string;
  declare user_id: string;
  declare total_amount: number;
  declare created_at: Date;
  declare updated_at: Date;

  // Association mixins
  declare getOrderItems: HasManyGetAssociationsMixin<OrderItem>;
  declare createOrderItem: HasManyCreateAssociationMixin<OrderItem>;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
      onDelete: 'CASCADE',
    },
    total_amount: {
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
    tableName: 'orders',
    timestamps: false,
  }
);

export default Order;
