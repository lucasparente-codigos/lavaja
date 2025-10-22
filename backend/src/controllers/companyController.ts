import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/password';
import { successResponse, errorResponse } from '../utils/response';

const prisma = new PrismaClient();

export const registerCompany = async (req: Request, res: Response) => {
  try {
    const { name, email, cnpj, password } = req.body;
    
    // Verificar se empresa já existe por email
    const existingCompanyByEmail = await prisma.company.findUnique({ where: { email } });
    if (existingCompanyByEmail) {
      return res.status(400).json(errorResponse('Email já cadastrado'));
    }

    // Verificar se empresa já existe por CNPJ
    const existingCompanyByCnpj = await prisma.company.findFirst({ where: { cnpj } });
    if (existingCompanyByCnpj) {
      return res.status(400).json(errorResponse('CNPJ já cadastrado'));
    }

    // Hash da senha
    const hashedPassword = await hashPassword(password);

    // Criar empresa
    const company = await prisma.company.create({ 
      data: { 
        name, 
        email, 
        cnpj, 
        password: hashedPassword 
      },
      select: {
        id: true,
        name: true,
        email: true,
        cnpj: true,
        createdAt: true
      }
    });

    res.status(201).json(successResponse(company, 'Empresa registrada com sucesso'));
  } catch (err: any) {
    console.error('Erro ao registrar empresa:', err);
    res.status(500).json(errorResponse('Erro interno do servidor'));
  }
};
