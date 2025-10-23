import { Router } from 'express';
import { registerCompany } from '../controllers/companyController';
import { validateRequest } from '../utils/validation';
import { companySchema } from '../utils/validation';

const router = Router();

router.post('/register', validateRequest(companySchema), registerCompany);

export default router;

