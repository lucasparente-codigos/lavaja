// backend/src/services/profileService.ts
import crypto from 'crypto';
import { UserModel } from '../models/User';
import { CompanyModel } from '../models/Company';
import { PasswordResetTokenModel } from '../models/PasswordResetToken';
import { hashPassword } from '../utils/password';

// Helper para criar erros com status
const createError = (message: string, status: number) => {
  const error: any = new Error(message);
  error.status = status;
  return error;
};

export class ProfileService {
  /**
   * Atualiza os detalhes (ex: nome) de um usuário ou empresa.
   */
  static async updateDetails(
    id: number,
    type: 'user' | 'company',
    data: { name: string }
  ) {
    let updatedEntity;

    if (type === 'user') {
      updatedEntity = await UserModel.update(id, { name: data.name });
    } else if (type === 'company') {
      updatedEntity = await CompanyModel.update(id, { name: data.name });
    } else {
      throw createError('Tipo de perfil inválido', 400);
    }

    if (!updatedEntity) {
      throw createError('Perfil não encontrado', 404);
    }

    return updatedEntity;
  }

  /**
   * Gera um token para reset de senha.
   */
  static async requestPasswordReset(userId: number, userType: 'user' | 'company', phoneNumber: string) {
    // Gerar um código de 6 dígitos
    const sixDigitCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 600000); // Expira em 10 minutos

    // Salva o código no banco de dados.
    // Note: Para um código de 6 dígitos de curta duração, o hash não é estritamente necessário
    // e complica a lógica. Armazenaremos em texto plano para este caso de uso.
    await PasswordResetTokenModel.create(userId, userType, sixDigitCode, expiresAt.toISOString());

    // Simula o envio de SMS
    console.log(`[SIMULAÇÃO DE SMS] Enviando para ${phoneNumber}. Seu código de verificação é: ${sixDigitCode}`);
    
    return {
      message: 'Um código de 6 dígitos foi enviado para o seu celular (verifique o console do backend).',
    };
  }

  /**
   * Reseta a senha usando um código de 6 dígitos válido.
   */
  static async resetPassword(userId: number, userType: 'user' | 'company', sixDigitCode: string, newPassword: string) {
    const storedToken = await PasswordResetTokenModel.findByUserId(userId, userType);

    if (!storedToken || storedToken.token !== sixDigitCode) {
      throw createError('Código de verificação inválido.', 400);
    }

    if (new Date() > new Date(storedToken.expiresAt)) {
      await PasswordResetTokenModel.delete(storedToken.id);
      throw createError('Código de verificação expirado. Solicite um novo.', 400);
    }

    const hashedPassword = await hashPassword(newPassword);

    if (userType === 'user') {
      await UserModel.update(storedToken.userId, { password: hashedPassword });
    } else {
      await CompanyModel.update(storedToken.userId, { password: hashedPassword });
    }

    // Invalida o token após o uso
    await PasswordResetTokenModel.delete(storedToken.id);

    return { message: 'Senha alterada com sucesso.' };
  }
}
