import { Request, Response, NextFunction } from 'express';
import { verifyPassword } from '../utils/password';
import { successResponse } from '../utils/response';
import jwt from 'jsonwebtoken';
import { UserModel, UserWithPassword } from '../models/User';
import { CompanyModel, CompanyWithPassword } from '../models/Company';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findByEmailWithPassword(email);
    const company = await CompanyModel.findByEmailWithPassword(email);

    const account: UserWithPassword | CompanyWithPassword | undefined = user || company;
    
    if (!account) {
      // Lança um erro que será capturado pelo errorHandler
      const err: any = new Error('Email ou senha incorretos');
      err.status = 401;
      throw err;
    }

    const isPasswordValid = await verifyPassword(password, account.password);
    if (!isPasswordValid) {
      const err: any = new Error('Email ou senha incorretos');
      err.status = 401;
      throw err;
    }

    const accountType = user ? 'user' : 'company';

    const token = jwt.sign(
      { 
        id: account.id, 
        email: account.email, 
        type: accountType 
      },
      process.env.JWT_SECRET!, // O '!' afirma que a variável foi verificada no index.ts
      { expiresIn: '24h' }
    );

    const userData = {
      id: account.id,
      name: account.name,
      email: account.email,
      phoneNumber: account.phoneNumber,
      type: accountType,
      ...(accountType === 'company' && (account as CompanyWithPassword).cnpj && { cnpj: (account as CompanyWithPassword).cnpj })
    };

    res.json(successResponse({
      token,
      user: userData
    }, 'Login realizado com sucesso'));

  } catch (err) {
    // Delega o erro para o middleware de tratamento de erros
    next(err);
  }
};
