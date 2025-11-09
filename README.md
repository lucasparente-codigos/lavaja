# 🧺 LavaJá - Sistema de Gerenciamento de Lavanderias

<div align="center">

![LavaJá Logo](frontend/public/logo.jpeg)

**Sistema completo para gestão de máquinas de lavanderia com filas inteligentes**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Endpoints](#-api-endpoints)
- [Roadmap](#-roadmap)
- [Contribuindo](#-contribuindo)

---

## 🎯 Sobre o Projeto

O **LavaJá** é uma plataforma fullstack que conecta usuários a lavanderias, permitindo:

- 🏢 **Para Empresas**: Gerenciamento de máquinas em tempo real
- 👤 **Para Usuários**: Visualização de disponibilidade e sistema de filas
- ⏱️ **Tempo Real**: Atualização automática via polling (10s)
- 🔐 **Seguro**: Autenticação JWT, hash bcrypt, rate limiting

### Problema Resolvido

Elimina a necessidade de ligar para a lavanderia ou ir presencialmente verificar disponibilidade. Usuários visualizam máquinas disponíveis em tempo real e podem entrar em filas virtuais.

---

## ✨ Funcionalidades

### Para Empresas (Lavanderias)
- ✅ Cadastro com CNPJ e validação
- ✅ Dashboard com todas as máquinas
- ✅ Adicionar/editar/deletar máquinas
- ✅ Marcar máquinas como "em uso" ou "livre"
- ✅ Visualizar fila de espera
- ✅ Gerenciar tempo estimado de uso

### Para Usuários
- ✅ Cadastro simples e rápido
- ✅ Visualizar empresas cadastradas
- ✅ Ver máquinas disponíveis em tempo real
- ✅ Entrar em fila de espera quando ocupado
- ✅ Countdown visual do tempo restante
- ✅ Notificação quando for sua vez

### Recursos Técnicos
- 🔒 Autenticação JWT com 24h de validade
- 🛡️ Rate limiting (100 req/15min)
- ✅ Validação robusta com Joi
- 🔄 Polling automático a cada 10s
- 📱 Interface responsiva (Tailwind CSS)
- 🗄️ Banco SQLite para desenvolvimento

---

## 🚀 Tecnologias

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Banco de Dados**: SQLite + SQL puro
- **Autenticação**: JWT + bcrypt
- **Validação**: Joi
- **Segurança**: Helmet, CORS, express-rate-limit

### Frontend
- **Framework**: React 18 + TypeScript
- **Roteamento**: React Router DOM v7
- **Estilização**: Tailwind CSS 3
- **HTTP Client**: Axios
- **Build Tool**: Vite 7

### DevOps
- **Desenvolvimento**: ts-node-dev
- **Gerenciamento**: npm/yarn
- **Concorrência**: Concurrently (rodar backend + frontend)

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0
- **Git** ([Download](https://git-scm.com/))

Verificar versões:
```bash
node --version
npm --version
git --version
```

---

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/lavaja.git
cd lavaja
```

### 2. Instale as dependências

#### Opção A: Instalação Raiz (recomendado)
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

#### Opção B: Instalação Separada
```bash
# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

---

## ⚙️ Configuração

### Backend - Variáveis de Ambiente

Crie o arquivo `backend/.env`:

```env
# Banco de Dados
DATABASE_URL="file:./data/dev.db"

# Autenticação (IMPORTANTE: Mude em produção!)
JWT_SECRET="seu_jwt_secret_super_seguro_mude_me_em_producao"

# Servidor
NODE_ENV="development"
PORT=4000

# CORS
FRONTEND_URL="http://localhost:5173"
```

⚠️ **IMPORTANTE**: 
- Nunca commite o arquivo `.env` 
- Gere um JWT_SECRET forte em produção: `openssl rand -base64 32`
- Adicione `.env` ao `.gitignore`

### Frontend - Variáveis de Ambiente

Crie o arquivo `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:4000/api
```

### Criação do Banco de Dados

O banco SQLite é criado automaticamente na primeira execução. Localização:
```
backend/data/dev.db
```

---

## 🎮 Executando o Projeto

### Desenvolvimento - Modo Completo (Recomendado)

Da raiz do projeto:
```bash
npm run dev
```

Isso inicia:
- ✅ Backend em `http://localhost:4000`
- ✅ Frontend em `http://localhost:5173`

### Desenvolvimento - Separado

#### Backend
```bash
cd backend
npm run dev
```

#### Frontend (em outro terminal)
```bash
cd frontend
npm run dev
```

### Produção

#### Backend
```bash
cd backend
npm run build
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

---

## 📁 Estrutura do Projeto

```
lavaja/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Lógica de negócio
│   │   │   ├── authController.ts
│   │   │   ├── userController.ts
│   │   │   ├── companyController.ts
│   │   │   └── machineController.ts   # [PRÓXIMO]
│   │   ├── models/            # Modelos de dados
│   │   │   ├── User.ts
│   │   │   ├── Company.ts
│   │   │   ├── Machine.ts             # [PRÓXIMO]
│   │   │   └── MachineQueue.ts        # [PRÓXIMO]
│   │   ├── routes/            # Definição de rotas
│   │   │   ├── authRoutes.ts
│   │   │   ├── userRoutes.ts
│   │   │   ├── companyRoutes.ts
│   │   │   └── machineRoutes.ts       # [PRÓXIMO]
│   │   ├── middleware/        # Middlewares
│   │   │   ├── auth.ts
│   │   │   └── errorHandler.ts
│   │   ├── utils/             # Utilitários
│   │   │   ├── validation.ts
│   │   │   ├── password.ts
│   │   │   └── response.ts
│   │   ├── database.ts        # Configuração do banco
│   │   └── index.ts           # Entry point
│   ├── data/                  # Banco SQLite
│   │   └── dev.db
│   ├── .env                   # Variáveis de ambiente
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/
│   │   └── logo.jpeg          # Logo da aplicação
│   ├── src/
│   │   ├── api/               # Configuração HTTP
│   │   │   └── api.ts
│   │   ├── components/        # Componentes reutilizáveis
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── InputField.tsx
│   │   ├── context/           # Context API
│   │   │   └── AuthContext.tsx
│   │   ├── pages/             # Páginas da aplicação
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── RegisterUser.tsx
│   │   │   ├── RegisterCompany.tsx
│   │   │   ├── HomePage.tsx
│   │   │   └── DashboardPage.tsx      # [PRÓXIMO]
│   │   ├── App.tsx            # App principal
│   │   ├── main.tsx           # Entry point
│   │   └── styles.css         # Tailwind
│   ├── .env.local             # Variáveis de ambiente
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── package.json               # Scripts raiz
├── README.md
└── .gitignore
```

---

## 🔌 API Endpoints

### Autenticação
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "Senha123"
}
```

### Usuários
```http
POST   /api/users/register      # Cadastrar usuário
GET    /api/users               # Listar usuários (requer auth)
DELETE /api/users/:id           # Deletar usuário (requer auth)
```

### Empresas
```http
POST   /api/companies/register  # Cadastrar empresa
GET    /api/companies           # Listar empresas (requer auth)
DELETE /api/companies/:id       # Deletar empresa (requer auth)
```

### Máquinas [EM DESENVOLVIMENTO]
```http
POST   /api/machines                    # Criar máquina
GET    /api/machines                    # Listar minhas máquinas
PUT    /api/machines/:id                # Editar máquina
DELETE /api/machines/:id                # Deletar máquina
POST   /api/machines/:id/start          # Marcar como "em uso"
POST   /api/machines/:id/finish         # Marcar como "livre"

GET    /api/public/companies            # Listar empresas (público)
GET    /api/public/companies/:id        # Ver máquinas da empresa
POST   /api/queue/join/:machineId       # Entrar na fila
DELETE /api/queue/leave/:machineId      # Sair da fila
GET    /api/machines/:id/status         # Status + fila
```

### Formato de Resposta
```typescript
// Sucesso
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}

// Erro
{
  "success": false,
  "error": "Mensagem de erro",
  "details": ["Detalhes opcionais"]
}
```

---

## 🛣️ Roadmap

### ✅ Fase 1: Autenticação (Completo)
- [x] Sistema de login/registro
- [x] JWT com 24h de validade
- [x] Diferenciação usuário/empresa
- [x] Hash de senhas com bcrypt
- [x] Rate limiting

### ✅ Fase 2: CRUD Básico (Completo)
- [x] CRUD de usuários
- [x] CRUD de empresas
- [x] Validação robusta (Joi)
- [x] Tratamento de erros

### 🚧 Fase 3: Sistema de Máquinas (Em Desenvolvimento)
- [ ] CRUD de máquinas (empresa)
- [ ] Status em tempo real
- [ ] Timer híbrido (backend + frontend)
- [ ] Listagem pública de empresas/máquinas

### 📅 Fase 4: Sistema de Filas (Próximo)
- [ ] Fila de espera por máquina
- [ ] Notificação "sua vez"
- [ ] Gerenciamento de posições
- [ ] Auto-avançar fila ao finalizar

### 🔮 Fase 5: Melhorias Futuras
- [ ] WebSocket para tempo real
- [ ] Notificações push
- [ ] Histórico de usos
- [ ] Avaliações e comentários
- [ ] Geolocalização de lavanderias
- [ ] Integração com pagamentos
- [ ] Dashboard analytics para empresas
- [ ] App mobile (React Native)

---

## 🐛 Problemas Conhecidos

### Corrigidos Recentemente
- ✅ Validação de CNPJ (agora aceita ambos formatos)
- ✅ Validação de senha no frontend
- ✅ Caminho da logo em produção

### Em Investigação
- ⚠️ Token expira sem refresh automático
- ⚠️ Sem paginação nas listagens
- ⚠️ Polling constante (consumo de rede)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Commit
```
feat: Nova funcionalidade
fix: Correção de bug
docs: Documentação
style: Formatação
refactor: Refatoração
test: Testes
chore: Manutenção
```

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido por **[Seu Nome]**

- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu Nome](https://linkedin.com/in/seu-perfil)
- Email: seu.email@exemplo.com

---

## 📞 Suporte

Encontrou um bug? Tem uma sugestão?

- 🐛 [Abrir Issue](https://github.com/seu-usuario/lavaja/issues)
- 💬 [Discussões](https://github.com/seu-usuario/lavaja/discussions)
- 📧 Email: suporte@lavaja.com

---

## 🙏 Agradecimentos

- [React](https://reactjs.org/) - Biblioteca UI
- [Express](https://expressjs.com/) - Framework backend
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

Made with ❤️ and ☕

</div>