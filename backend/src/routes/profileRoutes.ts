// backend/src/routes/profileRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { 
  updateProfileDetails,
  requestPasswordReset,
  resetPassword
} from '../controllers/profileController';

const router = Router();

// Rotas protegidas que requerem autenticação
router.use(authenticateToken);

// Atualizar detalhes do perfil (nome)
router.put('/details', updateProfileDetails);

// Solicitar reset de senha
router.post('/request-password-reset', requestPasswordReset);

// Resetar senha com token
router.post('/reset-password', resetPassword);

export default router;
