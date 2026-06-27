import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import config from '../../config';
import { IRegisterUserPayload } from './user.interface';

// RegisterUser
const registerIntoDB = async (payload: IRegisterUserPayload) => {
  const { name, email, password, profilePhoto } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  // Validation
  if (isUserExist) {
    throw new Error('User with this email already exists!');
  }

  // HashedPassword
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  // CreatedUser
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profile: {
        create: {
          profilePhoto,
        },
      },
    },
  });

  // CreateUserProfile
  // await prisma.profile.create({
  //   data: {
  //     userId: createdUser.id,
  //     profilePhoto,
  //   },
  // });

  // FindUniqueUser
  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },
    omit: { password: true },
    include: {
      profile: true,
    },
  });
  return user;
};

// GetUserProfile
const getMyProfileFromDB = async () => {};

export const userService = {
  registerIntoDB,
  getMyProfileFromDB,
};
