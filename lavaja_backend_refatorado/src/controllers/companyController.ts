import { Request, Response } from 'express';
import { hashPassword } from '../utils/password';
import { successResponse, errorResponse } from '../utils/response';
import { CompanyModel } from '../models/Company';

export const registerCompany = async (req: Request, res: Response) => {
  try {
    const { name, email, cnpj, password } = req.body;
    
    // Verificar se empresa já existe por email
    const existingCompanyByEmail = await CompanyModel.findByEmail(email);
    if (existingCompanyByEmail) {
      return res.status(400).json(errorResponse('Email já cadastrado'));
    }

    // Verificar se empresa já existe por CNPJ
    const existingCompanyByCnpj = await CompanyModel.findByCnpj(cnpj);
    if (existingCompanyByCnpj) {
      return res.status(400).json(errorResponse('CNPJ já cadastrado'));
    }

    // Hash da senha
    const hashedPassword = await hashPassword(password);

    // Criar empresa
    const company = await CompanyModel.create({ 
      name, 
      email, 
      cnpj, 
      password: hashedPassword 
    });

    // Remover a senha do objeto de retorno
    const { password: _, ...companyWithoutPassword } = company;

    res.status(201).json(successResponse(companyWithoutPassword, 'Empresa registrada com sucesso'));
  } catch (err: any) {
    console.error('Erro ao registrar empresa:', err);
    res.status(500).json(errorResponse('Erro interno do servidor'));
  }
};
