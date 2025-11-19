// backend/src/controllers/__tests__/company.test.ts
import { Request, Response } from 'express';
import { deleteCompany } from '../companyController';
import { CompanyModel } from '../../models/Company';
import { MachineModel } from '../../models/Machine';
import { MachineQueueModel } from '../../models/MachineQueue';
import { successResponse, errorResponse } from '../../utils/response';

// Mock the models
jest.mock('../../models/Company');
jest.mock('../../models/Machine');
jest.mock('../../models/MachineQueue');
jest.mock('../../utils/response');

describe('deleteCompany', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      params: { id: '1' },
    };
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a 400 error if the company has associated machines', async () => {
    (MachineModel.findByCompany as jest.Mock).mockResolvedValue([{ id: 1 }]);

    await deleteCompany(req as Request, res as Response);

    expect(MachineModel.findByCompany).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith(errorResponse('Não é possível deletar uma empresa com máquinas associadas.'));
  });

  it('should return a 400 error if the company has users in the queue', async () => {
    (MachineModel.findByCompany as jest.Mock).mockResolvedValue([]);
    (MachineQueueModel.countByCompany as jest.Mock).mockResolvedValue(1);

    await deleteCompany(req as Request, res as Response);

    expect(MachineModel.findByCompany).toHaveBeenCalledWith(1);
    expect(MachineQueueModel.countByCompany).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith(errorResponse('Não é possível deletar uma empresa com usuários na fila de espera.'));
  });

  it('should delete the company and return a 200 success response if there are no associated machines or queues', async () => {
    (MachineModel.findByCompany as jest.Mock).mockResolvedValue([]);
    (MachineQueueModel.countByCompany as jest.Mock).mockResolvedValue(0);
    (CompanyModel.delete as jest.Mock).mockResolvedValue(true);

    await deleteCompany(req as Request, res as Response);

    expect(MachineModel.findByCompany).toHaveBeenCalledWith(1);
    expect(MachineQueueModel.countByCompany).toHaveBeenCalledWith(1);
    expect(CompanyModel.delete).toHaveBeenCalledWith(1);
    expect(jsonMock).toHaveBeenCalledWith(successResponse(null, 'Empresa deletada com sucesso'));
  });

  it('should return a 404 error if the company is not found', async () => {
    (MachineModel.findByCompany as jest.Mock).mockResolvedValue([]);
    (MachineQueueModel.countByCompany as jest.Mock).mockResolvedValue(0);
    (CompanyModel.delete as jest.Mock).mockResolvedValue(false);

    await deleteCompany(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith(errorResponse('Empresa não encontrada'));
  });

  it('should return a 400 error if the company ID is invalid', async () => {
    req.params!.id = 'invalid';

    await deleteCompany(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith(errorResponse('ID de empresa inválido'));
  });
});
