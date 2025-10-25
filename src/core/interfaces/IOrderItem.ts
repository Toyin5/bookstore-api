import { IBook } from './IBook';
import { IOrder } from './IOrder';

export interface IOrderItem {
  id: number;
  order_item_id: string;
  order_id: string;
  book_id: string;
  quantity: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  order?: IOrder;
  book?: IBook;
}

export default IOrderItem;
