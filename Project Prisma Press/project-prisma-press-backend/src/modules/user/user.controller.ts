import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { userService } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import config from '../../config';
import { jwtUtils } from '../../utils/jwt';

// RegisterUser
// const registerUser = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;
//     // console.log(payload);

//     const user = await userService.registerIntoDB(payload);

//     // res.status(httpStatus.CREATED).json({
//     //   success: true,
//     //   statusCode: httpStatus.CREATED,
//     //   message: 'User registered successfully!',
//     //   data: { user },
//     // });

//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.CREATED,
//       message: 'User registered successfully!',
//       data: { user },
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//       message: 'Failed to register user!',
//       error: (error as Error).message,
//     });
//   }
// };

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await userService.registerIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully!',
    data: { user },
  });
});

// GetUserProfile
const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const { accessToken } = req.cookies;
    // console.log(req.user, 'User request');

    // const verifiedToken = jwtUtils.verifyToken(
    //   accessToken,
    //   config.jwt_access_secret,
    // );

    // if (typeof verifiedToken === 'string') {
    //   throw new Error(verifiedToken);
    // }

    const profile = await userService.getMyProfileFromDB(
      req.user?.id as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User Profile found successfully!',
      data: { profile },
    });
  },
);

export const userController = {
  registerUser,
  getMyProfile,
};
