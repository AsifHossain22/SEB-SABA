import type { Request, Response } from 'express';
import authService from '../services/auth.service';
import { sendResponse } from '../../utils/sendResponse';
import { signToken } from '../../utils/jwt';

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
