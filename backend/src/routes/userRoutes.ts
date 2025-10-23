import { Router } from 'express';
import { registerUser } from '../controllers/userController';
import { validateRequest } from '../utils/validation';
import { userSchema } from '../utils/validation';

const router = Router();

router.post('/register', validateRequest(userSchema), registerUser);

export default router;

