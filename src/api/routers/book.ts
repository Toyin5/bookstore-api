import { Router } from 'express';
import { getBookByIdHandler, getBooksHandler } from '../requestHandlers/book';

const bookRouter = Router();

bookRouter.get('/', getBooksHandler);
bookRouter.get('/:id', getBookByIdHandler);

export default bookRouter;