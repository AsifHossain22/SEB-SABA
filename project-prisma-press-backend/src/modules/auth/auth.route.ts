import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router();

// LogIn
router.post('/login', authController.loginUser);

// RefreshToken
router.post('/refresh-token', authController.refreshToken);

export const authRoutes = router;
