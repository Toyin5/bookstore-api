import { validate } from '../../core/utils/validate';
import { userSignUpSchema } from '../../core/validations/auth';
import { UserCreationType } from '../../core/interfaces/IUser';
import { loginUser, registerUser } from '../../core/controllers/auth.controller';
import { AppResponse } from '../../core/utils/appResponse';
import { wrapAsync } from '../middlewares/wrapAsync';
import { createTokens } from '../../core/services/auth.service';
import { accessTokenConfig, refreshTokenConfig } from '../../core/configs/default';

export const registerHandler = wrapAsync(async (req, res, next) => {
  const request = validate<UserCreationType>(req.body, userSignUpSchema);
  const response = await registerUser(request);
  AppResponse(
    res,
    {
      first_name: response.first_name,
      last_name: response.last_name,
      email: response.email,
      user_id: response.user_id,
    },
    'User registered successfully',
    201
  );
});

export const loginHandler = wrapAsync(async (req, res, next) => {
  const request = validate<{ email: string; password: string }>(req.body, userSignUpSchema);
  const response = await loginUser(request.email, request.password);
  const { accessToken, refreshToken } = createTokens({ user: response.user_id });
  res.cookie(accessTokenConfig.cookieName, accessToken, accessTokenConfig.cookieOptions);
  res.cookie(refreshTokenConfig.cookieName, refreshToken, refreshTokenConfig.cookieOptions);
  AppResponse(
    res,
    {
      email: response.email,
      user_id: response.user_id,
    },
    'User logged in successfully',
    200
  );
});
