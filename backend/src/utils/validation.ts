import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Nome deve ter pelo menos 2 caracteres',
    'string.max': 'Nome deve ter no máximo 50 caracteres',
    'any.required': 'Nome é obrigatório'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email deve ter um formato válido',
    'any.required': 'Email é obrigatório'
  }),
  password: Joi.string().min(6).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
    'string.min': 'Senha deve ter pelo menos 6 caracteres',
    'string.pattern.base': 'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número',
    'any.required': 'Senha é obrigatória'
  })
});

export const companySchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Nome da empresa deve ter pelo menos 2 caracteres',
    'string.max': 'Nome da empresa deve ter no máximo 100 caracteres',
    'any.required': 'Nome da empresa é obrigatório'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email deve ter um formato válido',
    'any.required': 'Email é obrigatório'
  }),
  // CORREÇÃO: Aceita CNPJ com OU sem formatação
  cnpj: Joi.string().pattern(/^\d{14}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/).required().messages({
    'string.pattern.base': 'CNPJ deve ter 14 dígitos ou formato 00.000.000/0000-00',
    'any.required': 'CNPJ é obrigatório'
  }),
  password: Joi.string().min(6).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
    'string.min': 'Senha deve ter pelo menos 6 caracteres',
    'string.pattern.base': 'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número',
    'any.required': 'Senha é obrigatória'
  })
});

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: error.details.map((detail: any) => detail.message)
      });
    }
    next();
  };
};

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email deve ter um formato válido',
    'any.required': 'Email é obrigatório'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Senha é obrigatória'
  })
});

