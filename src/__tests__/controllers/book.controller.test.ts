import Book from '../../core/model/book';
import * as bookController from '../../core/controllers/book.controller';

jest.mock('../../core/model/book');
jest.mock('../../core/model/cart');

describe('BookController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBooks', () => {
    it('should return all books', async () => {
      const mockBooks = {
        rows: [
          {
            id: 1,
            uuid: 'book-1',
            title: 'Test Book 1',
            author: 'Author 1',
            isbn: '123-456',
            price: 29.99,
            stock: 10,
          },
          {
            id: 2,
            uuid: 'book-2',
            title: 'Test Book 2',
            author: 'Author 2',
            isbn: '456-789',
            price: 19.99,
            stock: 5,
          },
        ],
        count: 2,
      };

      (Book.findAndCountAll as jest.Mock).mockResolvedValue(mockBooks);

      const result = await bookController.getBooks();
      expect(Book.findAndCountAll).toHaveBeenCalled();
      expect(result.rows).toEqual(mockBooks.rows);
      expect(result.count).toEqual(mockBooks.count);
    });
  });

  describe('getBookById', () => {
    it('should return a book by id', async () => {
      const mockBook = {
        id: 1,
        uuid: 'book-1',
        title: 'Test Book',
        author: 'Author',
        isbn: '123-456',
        price: 29.99,
        stock: 10,
      };

      (Book.findOne as jest.Mock).mockResolvedValue(mockBook);

      const result = await bookController.getBookById(mockBook.uuid);

      expect(Book.findOne).toHaveBeenCalledWith({
        attributes: ['uuid', 'title', 'author', 'isbn', 'description', 'genre', 'price', 'stock'],
        where: { uuid: 'book-1' },
      });
      expect(result).toEqual(mockBook);
    });

    it('should return 404 when book is not found', async () => {
      (Book.findOne as jest.Mock).mockResolvedValue(null);

      const result = await bookController.getBookById('2f3a6050-f080-416c-bf78-e1023a0b907e');

      expect(Book.findOne).toHaveBeenCalledWith({
        attributes: ['uuid', 'title', 'author', 'isbn', 'description', 'genre', 'price', 'stock'],
        where: { uuid: '2f3a6050-f080-416c-bf78-e1023a0b907e' },
      });
      expect(result).toBeNull();
    });
  });
});
