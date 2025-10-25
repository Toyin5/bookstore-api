export const accessTokenConfig = {
  duration: "15m",
  cookieName: "bookstore-access_token",
  cookieOptions: { maxAge: 300000, httpOnly: true, secure: true },
};

export const refreshTokenConfig = {
  duration: "30m",
  cookieName: "bookstore-refresh_token",
  cookieOptions: { maxAge: 3000000, httpOnly: true, secure: true },
};