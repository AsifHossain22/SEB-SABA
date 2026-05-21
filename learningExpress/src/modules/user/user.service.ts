import { pool } from '../../db';
import type { IUser } from './user.interface';
import bcrypt from 'bcryptjs';

// CreateUser - POST
const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age } = payload;

  // HashPassword
  const hashPassword = await bcrypt.hash(password, 10);
  // console.log(hashPassword);

  const result = await pool.query(
    `
    INSERT INTO users(name, email, password, age)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `,
    [name, email, hashPassword, age],
  );
  // console.log(result);
  delete result.rows[0].password;
  return result;
};

// GetAllUsers - GET
const getAllUsersFromDB = async () => {
  const result = await pool.query(
    `
      SELECT id, name, email, age FROM users
      `,
  );
  return result;
};

// GetSingleUser - GET
const getSingleUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM users WHERE id = $1
      `,
    [id],
  );
  return result;
};

// UpdateUser - PUT
const updateUserIntoDB = async (payload: IUser, id: string) => {
  const { name, password, age, is_active } = payload;
  const result = await pool.query(
    `
    UPDATE users SET name = COALESCE($1, name), password = COALESCE($2, password), age = COALESCE($3, age), is_active = COALESCE($4, is_active)
    WHERE id = $5
    RETURNING *
    `,
    [name, password, age, is_active, id],
  );
  return result;
};

// DeleteUser - DELETE
const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
      DELETE FROM users WHERE id = $1
      `,
    [id],
  );
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
