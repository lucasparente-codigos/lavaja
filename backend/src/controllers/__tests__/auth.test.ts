// backend/src/controllers/__tests__/auth.test.ts
import { Request, Response, NextFunction } from 'express';
import { login } from '../authController';
import { UserModel } from '../../models/User';
import { CompanyModel } from '../../models/Company';
import { verifyPassword } from '../../utils/password';
import { successResponse } from '../../utils/response';
import jwt from 'jsonwebtoken';

jest.mock('../../models/User');
jest.mock('../../models/Company');
jest.mock('../../utils/password');
jest.mock('../../utils/response');
jest.mock('jsonwebtoken');

describe('login', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      status: statusMock,
      json: jsonMock,
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login a user successfully and return a token', async () => {
    const user = { id: 1, name: 'Test User', email: 'test@example.com', password: 'hashedpassword' };
    (UserModel.findByEmailWithPassword as jest.Mock).mockResolvedValue(user);
    (CompanyModel.findByEmailWithPassword as jest.Mock).mockResolvedValue(null);
    (verifyPassword as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('testtoken');

    await login(req as Request, res as Response, next);

    expect(UserModel.findByEmailWithPassword).toHaveBeenCalledWith('test@example.com');
    expect(verifyPassword).toHaveBeenCalledWith('password123', 'hashedpassword');
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(successResponse({ token: 'testtoken', user: expect.any(Object) }, 'Login realizado com sucesso'));
  });

  it('should login a company successfully and return a token', async () => {
    const company = { id: 1, name: 'Test Company', email: 'test@example.com', password: 'hashedpassword', cnpj: '12345678901234' };
    (UserModel.findByEmailWithPassword as jest.Mock).mockResolvedValue(null);
    (CompanyModel.findByEmailWithPassword as jest.Mock).mockResolvedValue(company);
    (verifyPassword as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('testtoken');

    await login(req as Request, res as Response, next);

    expect(CompanyModel.findByEmailWithPassword).toHaveBeenCalledWith('test@example.com');
    expect(verifyPassword).toHaveBeenCalledWith('password123', 'hashedpassword');
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(successResponse({ token: 'testtoken', user: expect.any(Object) }, 'Login realizado com sucesso'));
  });

  it('should return a 401 error for incorrect password', async () => {
    const user = { id: 1, name: 'Test User', email: 'test@example.com', password: 'hashedpassword' };
    (UserModel.findByEmailWithPassword as jest.Mock).mockResolvedValue(user);
    (verifyPassword as jest.Mock).mockResolvedValue(false);

    await login(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it('should return a 401 error for non-existent user', async () => {
    (UserModel.findByEmailWithPassword as jest.Mock).mockResolvedValue(null);
    (CompanyModel.findByEmailWithPassword as jest.Mock).mockResolvedValue(null);

    await login(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
