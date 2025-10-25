import 'dotenv/config';
import jwt from 'jsonwebtoken';
import env from '../configs/environment';

export const signJwt = (object: object, p0: { expiresIn: string }) =>
  jwt.sign(object, env.PRIVATE_KEY as string, {
    expiresIn: '24hr',
    algorithm: 'RS256',
  });

export const verifyJwt = (token: string) => {
  try {
    const decodedValue = <jwt.JwtPayload>jwt.verify(token, env.PUBLIC_KEY as string);
    console.log(decodedValue);
    return {
      expired: false,
      decodedValue: decodedValue,
    };
  } catch (err) {
    return {
      expired: (err as { name: string }).name === 'TokenExpiredError',
      decodedValue: null,
    };
  }
};
