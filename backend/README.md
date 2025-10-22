# LavaJá Backend

## 🚀 Configuração Rápida

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do backend com:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="seu_jwt_secret_super_seguro_aqui"
NODE_ENV="development"
PORT=4000
FRONTEND_URL="http://localhost:5173"
```

### 3. Executar o Servidor
```bash
npm run dev
```

## 🔧 Melhorias Implementadas

### ✅ Segurança
- **Hash de senhas** com bcrypt (salt rounds: 12)
- **Helmet** para headers de segurança
- **Rate limiting** (100 requests/15min por IP)
- **CORS** configurado para frontend

### ✅ Validação
- **Joi** para validação robusta de dados
- **Mensagens de erro** em português
- **Validação de CNPJ** com formato correto
- **Validação de senha** (maiúscula, minúscula, número)

### ✅ Estrutura
- **Controllers** organizados
- **Middleware** de tratamento de erros
- **Respostas padronizadas** (success/error)
- **Logs** estruturados

### ✅ Banco de Dados
- **Prisma ORM** com SQLite
- **Migrations** versionadas
- **Índices únicos** para email e CNPJ
- **Select** apenas campos necessários

## 📊 Endpoints

### POST /api/users/register
Cadastro de usuário com validação completa.

### POST /api/companies/register
Cadastro de empresa com validação de CNPJ.

## 🔍 Monitoramento
- Logs de erro estruturados
- Rate limiting ativo
- Headers de segurança
- CORS configurado

## 🛡️ Segurança
- Senhas hasheadas com bcrypt
- Validação de entrada robusta
- Rate limiting por IP
- Headers de segurança (Helmet)
