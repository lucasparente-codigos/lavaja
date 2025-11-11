// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  id: number;
  email: string;
  type: 'user' | 'company';
}

// Aumenta a interface Request do Express para incluir a propriedade 'user'
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: 'Token de acesso necessário' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false,
        error: 'Token inválido' 
      });
    }
    // O cast é seguro pois o token foi assinado com o formato TokenPayload
    req.user = user as TokenPayload; 
    next();
  });
};
