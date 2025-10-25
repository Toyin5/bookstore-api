import { NextFunction, Request, Response } from 'express';
import { accessTokenConfig, refreshTokenConfig } from '../../core/configs/default';
import { reissueTokens } from '../../core/services/auth.service';
import { verifyJwt } from '../../core/utils/jwt';
import AppError from '../../core/utils/appError';

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies[accessTokenConfig.cookieName];
  const refreshToken = req.cookies[refreshTokenConfig.cookieName];
  if (!accessToken || !refreshToken) return next();

  const { decodedValue, expired } = verifyJwt(accessToken);
  if (decodedValue) {
    res.locals.user = decodedValue;

    return next();
  }

  if (expired && refreshToken) {
    const newTokens = await reissueTokens(refreshToken);
    if (newTokens) {
      res.cookie(
        accessTokenConfig.cookieName,
        newTokens.accessToken,
        accessTokenConfig.cookieOptions
      );
      res.cookie(
        refreshTokenConfig.cookieName,
        newTokens.refreshToken,
        refreshTokenConfig.cookieOptions
      );
      const { decodedValue } = verifyJwt(newTokens.accessToken);
      res.locals.user = decodedValue;
    } else {
      res.locals.user = null;
    }
  }

  return next();
};

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user)
    throw new AppError('You are not logged in! Please log in to access this resource.', 401);

  return next();
};
