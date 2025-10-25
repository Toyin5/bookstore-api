import { IUser } from './IUser';
import { IOrderItem } from './IOrderItem';

export interface IOrder {
  id: number;
  order_id: string;
  user_id: string;
  total_amount: number;
  created_at: Date;
  updated_at: Date;
  user?: IUser;
  orderItems?: IOrderItem[];
}

export default IOrder;
