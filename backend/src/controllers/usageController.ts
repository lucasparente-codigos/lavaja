// backend/src/controllers/usageController.ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { UsageService } from '../services/usageService';
import { successResponse } from '../utils/response';
import { broadcastMachineUpdate } from '../socket';

// Iniciar uso de máquina
export const startUsage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { machineId } = req.params;
    const userId = req.user?.id;

    if (!userId || req.user?.type !== 'user') {
      const err: any = new Error('Apenas usuários podem iniciar uso de máquinas');
      err.status = 403;
      throw err;
    }

    const machineIdNum = parseInt(machineId, 10);
    if (isNaN(machineIdNum)) {
      const err: any = new Error('ID de máquina inválido');
      err.status = 400;
      throw err;
    }

    const result = await UsageService.startUsage(machineIdNum, userId);

    broadcastMachineUpdate(result.machine.id);

    res.status(201).json(successResponse(result, 'Uso iniciado com sucesso'));
  } catch (err) {
    next(err);
  }
};

// Finalizar uso (empresa ou usuário)
export const finishUsage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { usageId } = req.params;
    const requesterId = req.user?.id;
    const requesterType = req.user?.type;

    if (!requesterId || !requesterType) {
      const err: any = new Error('Autenticação necessária');
      err.status = 403;
      throw err;
    }

    const usageIdNum = parseInt(usageId, 10);
    if (isNaN(usageIdNum)) {
      const err: any = new Error('ID de uso inválido');
      err.status = 400;
      throw err;
    }

    const result = await UsageService.finishUsage(usageIdNum, requesterId, requesterType);

    if (result.machine) {
      broadcastMachineUpdate(result.machine.id);
    }

    res.json(successResponse(result, 'Uso finalizado com sucesso'));
  } catch (err) {
    next(err);
  }
};

// Cancelar uso próprio (usuário)
export const cancelUsage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId || req.user?.type !== 'user') {
      const err: any = new Error('Apenas usuários podem cancelar seus usos');
      err.status = 403;
      throw err;
    }

    const result = await UsageService.cancelUsage(userId);

    if (result.machine) {
      broadcastMachineUpdate(result.machine.id);
    }

    res.json(successResponse(result, 'Uso cancelado com sucesso'));
  } catch (err) {
    next(err);
  }
};

// Buscar uso ativo do usuário
export const getMyCurrentUsage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId || req.user?.type !== 'user') {
      const err: any = new Error('Apenas usuários podem consultar seus usos');
      err.status = 403;
      throw err;
    }

    const result = await UsageService.getUserActiveUsage(userId);

    res.json(successResponse(result));
  } catch (err) {
    next(err);
  }
};

// Finalizar uso de máquina específica (empresa)
export const finishMachineUsage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { machineId } = req.params;
    const companyId = req.user?.id;

    if (!companyId || req.user?.type !== 'company') {
      const err: any = new Error('Apenas empresas podem finalizar usos de suas máquinas');
      err.status = 403;
      throw err;
    }

    const machineIdNum = parseInt(machineId, 10);
    if (isNaN(machineIdNum)) {
      const err: any = new Error('ID de máquina inválido');
      err.status = 400;
      throw err;
    }

    const result = await UsageService.finishMachineUsage(machineIdNum, companyId);

    broadcastMachineUpdate(result.machine.id);

    res.json(successResponse(result, 'Uso finalizado com sucesso'));
  } catch (err) {
    next(err);
  }
};