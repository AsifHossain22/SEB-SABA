import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();

// POST - CreateUser
router.post('/', userController.createUser);

// GET - GetAllUsers
router.get('/', userController.getAllUsers);

// GET - GetSingleData
router.get('/:id', userController.getSingleUser);

// PUT - UpdateUser
router.put('/:id', userController.updateUser);

// DELETE - DeleteUser
router.delete('/:id', userController.deleteUser);

export const userRoute = router;
