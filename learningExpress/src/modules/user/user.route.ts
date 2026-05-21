import { Router } from 'express';
import { userController } from './user.controller';
import auth from '../../middleware/auth';

const router = Router();

// POST - CreateUser
router.post('/', userController.createUser);

// GET - GetAllUsers
router.get('/', auth(), userController.getAllUsers); // ProtectedRoute

// GET - GetSingleData
router.get('/:id', userController.getSingleUser);

// PUT - UpdateUser
router.put('/:id', userController.updateUser);

// DELETE - DeleteUser
router.delete('/:id', userController.deleteUser);

export const userRoute = router;
