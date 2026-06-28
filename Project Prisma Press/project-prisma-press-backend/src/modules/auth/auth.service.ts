import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import { ILoginUser } from './auth.interface';
import { JwtPayload, SignOptions } from 'jsonwebtoken';
import config from '../../config';
import { jwtUtils } from '../../utils/jwt';

// LogInUser
const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  // const user = await prisma.user.findUnique({
  //   where: { email },
  // });

  // if (!user) {
  //   throw new Error('User not found!');
  // }

  // FindUserAndThrow
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  // PasswordValidation
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error('Password is incorrect!');
  }

  // JWTPayload
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  // GenerateAccessToken
  // const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
  //   expiresIn: config.jwt_access_expires_in,
  // } as SignOptions);

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  // GenerateRefreshToken
  // const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret, {
  //   expiresIn: config.jwt_refresh_expires_in,
  // } as SignOptions);

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// RefreshToken
const refreshToken = async (refreshToken: string) => {
  const verifiedRefreshToken = jwtUtils.verifyToken(
    refreshToken,
    config.jwt_refresh_secret,
  );

  if (!verifiedRefreshToken.success) {
    throw new Error(verifiedRefreshToken.error);
  }

  const { id } = verifiedRefreshToken.data as JwtPayload;

  const user = await prisma.user.findUniqueOrThrow({
    where: { id },
  });

  if (user.activeStatus === 'INACTIVE') {
    throw new Error('User is inactive!');
  }

  const jwtPayload = {
    id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );
  return { accessToken };
};

export const authService = {
  loginUser,
  refreshToken,
};
