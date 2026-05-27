import type { NextFunction, Request, Response } from 'express';
import { sendResponse } from './sendResponse';
import { verifyToken } from './jwt';
import authService from '../api/services/auth.service';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return sendResponse(res, { message: 'Token not found!' }, 404);
  }

  const payload = verifyToken(token, 'access');

  if (!payload) {
    return sendResponse(res, { message: 'Invalid token!' }, 401);
  }

  const user = await authService.getUserById(payload.id);

  if (!user) {
    return sendResponse(res, { message: 'User not found!' }, 404);
  }

  req.user = user;

  next();
};
