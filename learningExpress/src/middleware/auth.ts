import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { pool } from '../db';
import type { TRoles } from '../types';

const auth = (...roles: TRoles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(roles);
    try {
      // console.log('This is protected route!');
      // console.log(req.headers.authorization);

      /*
       * 1. Check if TOKEN exists
       * 2. Verify the TOKEN
       * 3. Find the user into database
       * 4. If the user active or not
       */

      // CheckIfTokenExists
      const token = req.headers.authorization;
      // console.log(token);

      if (!token) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized access!',
          data: null,
        });
      }

      // VerifyToken
      const decodedToken = jwt.verify(
        token as string,
        config.secret as string,
      ) as JwtPayload;
      // console.log(decodedToken);

      const userData = await pool.query(
        `
      SELECT * FROM users WHERE email = $1
      `,
        [decodedToken.email],
      );
      // console.log(userData);

      // FindUserInDatabase
      const user = userData.rows[0];
      // console.log(user);

      if (userData.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: 'User not found!',
          data: null,
        });
      }

      // UserActiveOrNot
      if (!user?.is_active) {
        res.status(403).json({
          success: false,
          message: 'Forbidden!',
          data: null,
        });
      }

      // CheckUserRole
      if (roles.length && !roles.includes(user.role)) {
        res.status(400).json({
          success: false,
          message: 'Invalid role has no access!',
          data: null,
        });
      }
      // console.log('Auth Role: ', user.role);

      //
      req.user = decodedToken;

      next();
    } catch (error) {
      next(error);
    }
  };
};
export default auth;
