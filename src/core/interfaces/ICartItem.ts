export interface ICartItem {
  id: number;
  item_id: string;
  cart_id: string;
  book_id: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export type CartItemCreationType = Pick<ICartItem, 'cart_id' | 'book_id' | 'quantity'>;
export default ICartItem;
