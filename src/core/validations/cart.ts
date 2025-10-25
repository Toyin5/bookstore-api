import { z } from 'zod';

export const addToCartSchema = z.object({
  book_id: z.string().uuid('Invalid book ID format'),
  quantity: z.number().int().positive('Quantity must be a positive number'),
});
