import { Op } from 'sequelize';
import logger from '../configs/logger';
import Book from '../model/book';

export const getBooks = async (page = 1, limit = 10, search = '') => {
  const offset = (page - 1) * limit;
  console.info('Search term:', search);
  logger.info('Offset:', offset, 'Limit:', limit);
  if (!search)
    return await Book.findAndCountAll({
      offset,
      limit,
      attributes: ['uuid', 'title', 'author', 'genre'],
    });
  return await Book.findAndCountAll({
    offset,
    limit,
    where: {
      [Op.or]: [
        { title: { [Op.like]: '%' + search + '%' } },
        { genre: { [Op.like]: '%' + search + '%' } },
        { author: { [Op.iLike]: '%' + search + '%' } },
      ],
    },
    attributes: ['uuid', 'title', 'author', 'genre'],
  });
};

export const getBookById = async (id: string) => {
  return await Book.findOne({
    where: { uuid: id },
    attributes: ['uuid', 'title', 'author', 'isbn', 'description', 'genre', 'price', 'stock'],
  });
};
