import { validate } from '../../core/utils/validate';
import { addToCartSchema } from '../../core/validations/cart';
import { addToCart, clearCart, getCart } from '../../core/controllers/cart.controller';
import { AppResponse } from '../../core/utils/appResponse';
import { wrapAsync } from '../middlewares/wrapAsync';
import { Request, Response, NextFunction } from 'express';

interface CartRequestBody {
  book_id: string;
  quantity: number;
}

export const getCartHandler = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user.user;
  const cart = await getCart(user.user);
  AppResponse(
    res,
    {
      cart,
    },
    'Cart fetched successfully',
    200
  );
});

export const addToCartHandler = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const request = validate<CartRequestBody>(req.body, addToCartSchema);
    const user = res.locals.user.user;
    const cart = await addToCart(user.user, {
      book_id: request.book_id,
      quantity: request.quantity,
    });
    AppResponse(
      res,
      {
        cart,
      },
      'Item added to cart successfully',
      200
    );
  }
);

export const clearCartHandler = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user.user;
    const result = await clearCart(user.user);
    AppResponse(res, result, result.message, 200);
  }
);
