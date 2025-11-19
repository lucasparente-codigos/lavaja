import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  id: number;
  email: string;
  type: 'user' | 'company';
}

// Augment the Express Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: 'Token de acesso necessário' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ 
      success: false,
      error: 'Token inválido' 
    });
  }
};
