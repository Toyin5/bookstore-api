import { accessTokenConfig, refreshTokenConfig } from "../configs/default";
import { signJwt, verifyJwt } from "../utils/jwt";

export const createTokens = (user: object) => {
  const accessToken = signJwt(
    { user },
    { expiresIn: accessTokenConfig.duration }
  );
  const refreshToken = signJwt(
    { user },
    { expiresIn: refreshTokenConfig.duration }
  );

  return { accessToken, refreshToken };
};

export const reissueTokens = async (refreshToken: string) => {
  const { decodedValue, expired } = verifyJwt(refreshToken);
  if (!decodedValue || expired) return null;

  const newTokens = createTokens(decodedValue.user);

  return newTokens;
};