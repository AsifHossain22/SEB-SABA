import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { authService } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

// LogInUser
const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { accessToken, refreshToken } = await authService.loginUser(payload);

    // AccessTokenCookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24, // 1 Day
    });

    // RefreshTokenCookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 Day
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User is logged in successfully!',
      data: { accessToken, refreshToken },
    });
  },
);

// RefreshToken
const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    const { accessToken } = await authService.refreshToken(refreshToken);

    // AccessTokenCookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24, // 1 Day
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Token Refreshed Successfully!',
      data: { accessToken },
    });
  },
);

export const authController = {
  loginUser,
  refreshToken,
};
