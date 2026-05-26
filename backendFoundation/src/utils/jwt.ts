import config from '../config';
import type { TRUser } from '../types';
import jwt from 'jsonwebtoken';

export const signToken = (payload: TRUser & { id: number }) => {
  // AccessToken
  const accessToken = jwt.sign(payload, config.jwtSecret, {
    expiresIn: '1d',
  });

  // RefreshToken
  const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, {
    expiresIn: '7d',
  });
  return { accessToken, refreshToken };
};
