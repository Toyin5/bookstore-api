export interface IBook {
  id: number;
  uuid: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  genre: string;
  price: number;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

export type BookCreationType = Pick<
  IBook,
  'title' | 'author' | 'isbn' | 'description' | 'price' | 'stock'
>;
export default IBook;
