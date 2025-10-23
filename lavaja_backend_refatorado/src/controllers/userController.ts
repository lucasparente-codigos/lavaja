import { Request, Response } from 'express';
import { hashPassword } from '../utils/password';
import { successResponse, errorResponse } from '../utils/response';
import { UserModel } from '../models/User';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
    // Verificar se usuário já existe
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json(errorResponse('Email já cadastrado'));
    }

    // Hash da senha
    const hashedPassword = await hashPassword(password);

    // Criar usuário
    const user = await UserModel.create({ 
      name, 
      email, 
      password: hashedPassword 
    });

    // Remover a senha do objeto de retorno
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json(successResponse(userWithoutPassword, 'Usuário registrado com sucesso'));
  } catch (err: any) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).json(errorResponse('Erro interno do servidor'));
  }
};
