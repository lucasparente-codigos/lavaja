import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const registerCompany = async (req: Request, res: Response) => {
  try {
    const { name, email, cnpj, password } = req.body;
    if (!name || !email || !cnpj || !password) return res.status(400).json({ error: 'Missing fields' });
    const company = await prisma.company.create({ data: { name, email, cnpj, password } });
    res.status(201).json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register company' });
  }
};
