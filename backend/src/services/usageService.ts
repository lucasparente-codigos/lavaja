// backend/src/services/usageService.ts
import { MachineModel } from '../models/Machine';
import { MachineUsageModel } from '../models/MachineUsage';
import { QueueService } from './queueService';

// Helper para criar erros com status
const createError = (message: string, status: number) => {
  const error: any = new Error(message);
  error.status = status;
  return error;
};

export class UsageService {
  /**
   * Iniciar uso de uma máquina
   */
  static async startUsage(machineId: number, userId: number) {
    const machine = await MachineModel.findById(machineId);
    if (!machine) {
      throw createError('Máquina não encontrada', 404);
    }

    if (machine.status !== 'disponivel') {
      throw createError('Máquina não está disponível', 409);
    }

    const hasActiveUsage = await MachineUsageModel.hasActiveUsage(userId);
    if (hasActiveUsage) {
      throw createError('Você já tem um uso ativo. Finalize-o antes de iniciar outro', 409);
    }

    const now = new Date();
    const startTime = now.toISOString();
    const estimatedEndTime = new Date(
      now.getTime() + machine.defaultDuration * 60 * 1000
    ).toISOString();

    const usage = await MachineUsageModel.create({
      machineId,
      userId,
      startTime,
      estimatedEndTime,
    });

    await MachineModel.updateStatus(machineId, 'em_uso', usage.id);

    return {
      usage,
      machine: await MachineModel.findById(machineId),
    };
  }

  /**
   * Finalizar uso de uma máquina
   */
  static async finishUsage(
    usageId: number,
    requesterId: number,
    requesterType: 'user' | 'company'
  ) {
    const usage = await MachineUsageModel.findById(usageId);
    if (!usage) {
      throw createError('Uso não encontrado', 404);
    }

    if (usage.status !== 'em_uso') {
      throw createError('Este uso já foi finalizado', 409);
    }

    const machine = await MachineModel.findById(usage.machineId);
    if (!machine) {
      throw createError('Máquina associada ao uso não encontrada', 404);
    }

    if (requesterType === 'user' && usage.userId !== requesterId) {
      throw createError('Você só pode finalizar seus próprios usos', 403);
    }

    if (requesterType === 'company' && machine.companyId !== requesterId) {
      throw createError('Você só pode finalizar usos de máquinas da sua empresa', 403);
    }

    const finishedUsage = await MachineUsageModel.finish(usageId, 'concluida');
    const nextInQueue = await QueueService.processQueue(usage.machineId);

    if (!nextInQueue) {
      await MachineModel.updateStatus(usage.machineId, 'disponivel', null);
    }

    return {
      usage: finishedUsage,
      machine: await MachineModel.findById(usage.machineId),
      nextInQueue,
    };
  }

  /**
   * Finalizar uso de uma máquina específica (pela empresa)
   */
  static async finishMachineUsage(machineId: number, companyId: number) {
    const machine = await MachineModel.findByIdAndCompany(machineId, companyId);
    if (!machine) {
      throw createError('Máquina não encontrada ou não pertence à sua empresa', 404);
    }

    if (!machine.currentUsageId) {
      throw createError('Esta máquina não possui um uso ativo para ser finalizado', 400);
    }

    return this.finishUsage(machine.currentUsageId, companyId, 'company');
  }

  /**
   * Cancelar uso ativo do usuário
   */
  static async cancelUsage(userId: number) {
    const usage = await MachineUsageModel.findActiveByUser(userId);
    if (!usage) {
      throw createError('Você não tem um uso ativo para cancelar', 404);
    }

    const cancelledUsage = await MachineUsageModel.finish(usage.id, 'cancelada');
    const nextInQueue = await QueueService.processQueue(usage.machineId);

    if (!nextInQueue) {
      await MachineModel.updateStatus(usage.machineId, 'disponivel', null);
    }

    return {
      usage: cancelledUsage,
      machine: await MachineModel.findById(usage.machineId),
      nextInQueue,
    };
  }

  /**
   * Buscar uso ativo do usuário
   */
  static async getUserActiveUsage(userId: number) {
    const usage = await MachineUsageModel.findActiveByUser(userId);
    if (!usage) {
      return null;
    }

    const machine = await MachineModel.findById(usage.machineId);
    if (!machine) {
      // Isso indica uma inconsistência de dados, mas tratamos para não quebrar
      throw createError('Máquina associada ao seu uso não foi encontrada', 404);
    }
    
    const now = Date.now();
    const endTime = new Date(usage.estimatedEndTime).getTime();
    const timeRemaining = Math.max(0, Math.floor((endTime - now) / 1000 / 60));

    return {
      usage,
      machine,
      timeRemaining,
    };
  }
}