import type { Request, Response } from 'express';
import authService from '../services/auth.service';
import { sendResponse } from '../../utils/sendResponse';
import { signToken, verifyToken } from '../../utils/jwt';

// SignUp
export const signup = async (req: Request, res: Response) => {
  const user = await authService.createUser(req.body);

  if (!user) {
    sendResponse(res, { message: 'Failed to create user!' }, 400);
    return;
  }

  sendResponse(res, { message: 'User created successfully!', data: user }, 201);
};

// LogIn
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authService.validateUser(email, password);

  if (!user) {
    sendResponse(res, { message: 'Invalid email or password!' }, 401);
    return;
  }

  const { accessToken, refreshToken } = signToken(user);

  // SetCookie
  res.cookie('refreshToken', refreshToken, {
    sameSite: 'lax',
    httpOnly: true,
    secure: false,
  });

  const result = {
    user: user,
    accessToken,
    refreshToken,
  };

  return sendResponse(res, {
    message: 'User logged in successfully!',
    data: result,
  });
};

// RefreshToken
export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return sendResponse(res, { message: 'Refresh Token not found!' }, 404);
  }

  const payload = verifyToken(refreshToken, 'refresh');

  if (!payload) {
    return sendResponse(res, { message: 'Invalid refresh token!' }, 401);
  }

  const user = await authService.getUserById(payload.id);

  if (!user) {
    return sendResponse(res, { message: 'User not found!' }, 404);
  }

  const { accessToken, refreshToken: newRefreshToken } = signToken(user);

  res.cookie('refreshToken', newRefreshToken, {
    secure: false,
    sameSite: 'lax',
    httpOnly: true,
  });

  sendResponse(res, {
    message: 'Token refreshed',
    data: {
      accessToken,
      newRefreshToken,
    },
  });
};
