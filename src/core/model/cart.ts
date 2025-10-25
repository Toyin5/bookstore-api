import { Model, DataTypes, Optional, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin } from 'sequelize';
import {sequelize} from '../database/sequelize';
import ICart from '../interfaces/ICart';
import CartItem from './cartItem';

type CartAttributes = Optional<
  ICart,
  | 'id' | 'cart_id'
  >;

interface CartInterface extends Model<CartAttributes> {
  id: number;
  cart_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  // Association mixins
  getCartItems: HasManyGetAssociationsMixin<CartItem>;
  createCartItem: HasManyCreateAssociationMixin<CartItem>;
}

class Cart extends Model<CartAttributes> implements CartInterface {
  declare id: number;
  declare cart_id: string;
  declare user_id: string;
  declare created_at: Date;
  declare updated_at: Date;
  
  // Association mixins
  declare getCartItems: HasManyGetAssociationsMixin<CartItem>;
  declare createCartItem: HasManyCreateAssociationMixin<CartItem>;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    cart_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4()
    },
    user_id:{
        type: DataTypes.STRING,
        allowNull: false,
        references:{
            model: 'users',
            key: 'user_id'
        },
        onDelete: 'CASCADE'
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
    tableName: 'carts',
    timestamps: false
  }
);

export default Cart;