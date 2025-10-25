import { getBookById, getBooks } from '../../core/controllers/book.controller';
import { AppResponse } from '../../core/utils/appResponse';
import { wrapAsync } from '../middlewares/wrapAsync';

export const getBooksHandler = wrapAsync(async (req, res, next) => {
  const { page = 1, limit = 10, search } = req.query;
  const books = await getBooks(Number(page), Number(limit), search as string);
  AppResponse(
    res,
    {
      books,
    },
    'Books fetched successfully',
    200
  );
});

export const getBookByIdHandler = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const book = await getBookById(id);
  AppResponse(
    res,
    {
      book,
    },
    'Book fetched successfully',
    200
  );
});
