import { Request, Response } from 'express';
import { verifyPassword } from '../utils/password';
import { successResponse, errorResponse } from '../utils/response';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { CompanyModel } from '../models/Company';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuário por email
    const user = await UserModel.findByEmail(email);
    const company = await CompanyModel.findByEmail(email);
    
    const account = user || company;
    const accountType = user ? 'user' : 'company';
    
    if (!account) {
      return res.status(401).json(errorResponse('Email ou senha incorretos'));
    }

    // Verificar senha
    const isPasswordValid = await verifyPassword(password, account.password);
    if (!isPasswordValid) {
      return res.status(401).json(errorResponse('Email ou senha incorretos'));
    }

    // Gerar token JWT
    const token = jwt.sign(
      { 
        id: account.id, 
        email: account.email, 
        type: accountType 
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    // Retornar dados do usuário (sem senha)
    const userData = {
      id: account.id,
      name: account.name,
      email: account.email,
      type: accountType,
      ...(accountType === 'company' && { cnpj: (account as any).cnpj })
    };

    res.json(successResponse({
      token,
      user: userData
    }, 'Login realizado com sucesso'));

  } catch (err: any) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json(errorResponse('Erro interno do servidor'));
  }
};
