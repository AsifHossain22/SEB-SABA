import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();

// UserRegister
router.post('/register', userController.registerUser);

// UserProfile
router.get('/me', userController.getMyProfile);

export const userRoutes = router;
