// backend/src/models/PasswordResetToken.ts
import { getDb } from '../database';

export interface PasswordResetToken {
  id: number;
  userId: number;
  userType: 'user' | 'company';
  token: string;
  expiresAt: string;
  createdAt: string;
}

export class PasswordResetTokenModel {
  /**
   * Cria um novo token de reset de senha.
   */
  static async create(
    userId: number,
    userType: 'user' | 'company',
    token: string,
    expiresAt: string
  ): Promise<PasswordResetToken> {
    const db = await getDb();
    
    // Deleta tokens antigos do mesmo usuário para evitar acúmulo
    await db.run('DELETE FROM PasswordResetToken WHERE userId = ? AND userType = ?', [userId, userType]);

    const result = await db.run(
      'INSERT INTO PasswordResetToken (userId, userType, token, expiresAt) VALUES (?, ?, ?, ?)',
      userId,
      userType,
      token,
      expiresAt
    );

    const newToken = await db.get<PasswordResetToken>('SELECT * FROM PasswordResetToken WHERE id = ?', result.lastID);
    if (!newToken) {
      throw new Error('Falha ao criar o token de reset de senha.');
    }
    return newToken;
  }

  /**
   * Busca um token pelo seu valor.
   */
  static async findByToken(token: string): Promise<PasswordResetToken | undefined> {
    const db = await getDb();
    return db.get<PasswordResetToken>('SELECT * FROM PasswordResetToken WHERE token = ?', token);
  }

  /**
   * Busca um token pelo ID e tipo do usuário.
   */
  static async findByUserId(userId: number, userType: 'user' | 'company'): Promise<PasswordResetToken | undefined> {
    const db = await getDb();
    return db.get<PasswordResetToken>('SELECT * FROM PasswordResetToken WHERE userId = ? AND userType = ?', [userId, userType]);
  }

  /**
   * Deleta um token pelo seu ID.
   */
  static async delete(id: number): Promise<boolean> {
    const db = await getDb();
    const result = await db.run('DELETE FROM PasswordResetToken WHERE id = ?', id);
    return (result.changes ?? 0) > 0;
  }
}
