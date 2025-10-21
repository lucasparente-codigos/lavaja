import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
    const user = await prisma.user.create({ data: { name, email, password } });
    res.status(201).json(user);
  } catch (err: any) {
    console.error(err);
    if (err.code === 'P2002') return res.status(400).json({ error: 'Email already registered' });
    res.status(500).json({ error: 'Failed to register user' });
  }
};
