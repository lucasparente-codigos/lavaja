import { Router } from 'express';
import { registerCompany } from '../controllers/companyController';
const router = Router();
router.post('/register', registerCompany);
export default router;
