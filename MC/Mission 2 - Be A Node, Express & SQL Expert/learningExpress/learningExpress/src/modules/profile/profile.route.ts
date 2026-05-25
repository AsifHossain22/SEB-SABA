import { Router } from 'express';
import { profileController } from './profile.controller';

const router = Router();

// POST
router.post('/', profileController.createProfile);

export const profileRoute = router;
