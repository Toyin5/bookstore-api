import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';
import ICartItem from '../interfaces/ICartItem';

type CartItemAttributes = Optional<ICartItem, 'id' | 'item_id'>;

class CartItem extends Model<CartItemAttributes> {
  declare id: string;
  declare cart_id: string;
  declare book_id: string;
  declare quantity: number;
  declare created_at: Date;
  declare updated_at: Date;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4(),
    },
    cart_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'carts',
        key: 'cart_id',
      },
      onDelete: 'CASCADE',
    },
    book_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'books',
        key: 'uuid',
      },
      onDelete: 'RESTRICT',
    },
    quantity: {
      type: DataTypes.INTEGER,
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
    tableName: 'cart_items',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['cart_id', 'book_id'],
      },
    ],
  }
);

export default CartItem;
