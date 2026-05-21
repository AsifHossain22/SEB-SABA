import type { Request, Response } from 'express';
import { userService } from './user.service';

// CreateUser - POST
const createUser = async (req: Request, res: Response) => {
  // console.log(req.body);
  // const { name, email, password, age } = req.body;

  try {
    const result = await userService.createUserIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// GetAllUser - GET
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'All users found successfully!',
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// GetSingleUser - GET
const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(id);

  try {
    const result = await userService.getSingleUserFromDB(id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'User found successfully!',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// UpdateUser - PUT
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params; // FindUserByID

  try {
    const result = await userService.updateUserIntoDB(req.body, id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// DeleteUser - DELETE
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userService.deleteUserFromDB(id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
