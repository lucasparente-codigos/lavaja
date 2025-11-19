import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

// Interface para erros com mais detalhes, como erros de validação
interface DetailedError {
  field: string;
  message: string;
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  // Erro de constraint única do Prisma (ex: email duplicado)
  if (err.code === 'P2002') {
    const field = err.meta?.target?.[0] || 'unknown';
    const message = `O campo '${field}' já está em uso.`;
    return res.status(409).json(errorResponse(message));
  }

  // Erro de registro não encontrado do Prisma
  if (err.code === 'P2025') {
    return res.status(404).json(errorResponse('O registro solicitado não foi encontrado.'));
  }

  // Erro de validação do Joi
  if (err.isJoi) {
    const errorMessage = err.details[0].message;
    return res.status(400).json(errorResponse(errorMessage || 'Dados de entrada inválidos.'));
  }

  // Erro de JWT (token inválido, expirado, etc.)
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json(errorResponse(err.message || 'Token inválido ou expirado.'));
  }

  // Erro padrão
  const message = process.env.NODE_ENV === 'development' ? err.message : 'Ocorreu um erro inesperado.';
  res.status(err.status || 500).json(errorResponse(message));
};
