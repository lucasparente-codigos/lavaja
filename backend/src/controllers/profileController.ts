// backend/src/controllers/profileController.ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ProfileService } from '../services/profileService';
import { successResponse } from '../utils/response';

export const updateProfileDetails = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const userId = req.user!.id;
    const userType = req.user!.type;

    if (!name || typeof name !== 'string') {
      const err: any = new Error('O campo "name" é obrigatório.');
      err.status = 400;
      throw err;
    }

    const updatedEntity = await ProfileService.updateDetails(userId, userType, { name });

    res.json(successResponse(updatedEntity, 'Perfil atualizado com sucesso.'));

  } catch (err) {
    next(err);
  }
};

export const requestPasswordReset = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const userType = req.user!.type;
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      throw { status: 400, message: 'O número de telefone é obrigatório.' };
    }

    const result = await ProfileService.requestPasswordReset(userId, userType, phoneNumber);

    res.json(successResponse(result, result.message));

  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { token, newPassword } = req.body;
    const userId = req.user!.id;
    const userType = req.user!.type;

    if (!token || !newPassword) {
      const err: any = new Error('O código de 6 dígitos e a nova senha são obrigatórios.');
      err.status = 400;
      throw err;
    }

    await ProfileService.resetPassword(userId, userType, token, newPassword);

    res.json(successResponse(true, 'Senha alterada com sucesso.'));

  } catch (err) {
    next(err);
  }
};
