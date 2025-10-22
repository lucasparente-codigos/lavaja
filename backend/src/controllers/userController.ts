import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/password';
import { successResponse, errorResponse } from '../utils/response';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
    // Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json(errorResponse('Email já cadastrado'));
    }

    // Hash da senha
    const hashedPassword = await hashPassword(password);

    // Criar usuário
    const user = await prisma.user.create({ 
      data: { 
        name, 
        email, 
        password: hashedPassword 
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    res.status(201).json(successResponse(user, 'Usuário registrado com sucesso'));
  } catch (err: any) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).json(errorResponse('Erro interno do servidor'));
  }
};
