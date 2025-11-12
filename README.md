# 🧺 LavaJá - Sistema de Gerenciamento de Lavanderias

<div align="center">

![LavaJá Logo](https://private-us-east-1.manuscdn.com/sessionFile/dDQ8Vrldw1La3DIefml8yy/sandbox/Kulk9UxR3rmiCkzwFlN7Yk-images_1762970623641_na1fn_L2hvbWUvdWJ1bnR1L2xhdmFqYS9mcm9udGVuZC9wdWJsaWMvbG9nbw.jpeg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZERROFZybGR3MUxhM0RJZWZtbDh5eS9zYW5kYm94L0t1bGs5VXhSM3JtaUNrendGbE43WWstaW1hZ2VzXzE3NjI5NzA2MjM2NDFfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyeGhkbUZxWVM5bWNtOXVkR1Z1WkM5d2RXSnNhV012Ykc5bmJ3LmpwZWciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=SMONKPRlImBYBlub8FtRWDZNXQ~VaskDMf8lI4uvrjeyihauUDjor30j4Fk9V7fulqA90G8uSdvP6bQhCJQTb43QPHlGzEGlx-W0MpbZnnvn53wRF4gDsMbMgtIE85j7Qnrcx~OctZlR8FVtHtyAk3CfGO0Gb4CHOSMkaLioy~rLTR3WUXOk7wC3pkFmyaNtKAOlglY2R8FOTxwOvJ9xJhXIiYs~Nozrkh~bPdyijVUXsEWb6BLf~yWDpfYwF8ZujFV-BFG12DcGeG2-ghq9i0vjUBw~fqvWqK73qIt7sKT5y4Gun8x3HEO05hR~u~mzmpmgFuWHVz0DJuQ0ZO4aoA__)

**Sistema completo para gestão de máquinas de lavanderia com status em tempo real e filas inteligentes**

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

O **LavaJá** é uma plataforma fullstack que conecta usuários a lavanderias, oferecendo um sistema robusto de gerenciamento de máquinas e filas de espera.

### Problema Resolvido

O projeto elimina a necessidade de contato direto ou deslocamento para verificar a disponibilidade de máquinas. Usuários podem visualizar o status das máquinas em tempo real, entrar em filas virtuais e ser notificados quando for sua vez, otimizando o tempo e a experiência.

---

## ✨ Funcionalidades

### Para Empresas (Lavanderias)
- ✅ **Cadastro e Gestão de Máquinas**: CRUD completo de máquinas (adicionar, editar, deletar).
- ✅ **Dashboard de Status**: Visualização em tempo real do status de todas as máquinas (Livre, Em Uso, Em Fila).
- ✅ **Controle de Uso**: Iniciar e finalizar o uso de máquinas manualmente.
- ✅ **Gerenciamento de Filas**: Visualizar a fila de espera de cada máquina e dispensar usuários que não confirmarem o uso.
- ✅ **Estatísticas**: Visualização de estatísticas básicas de uso das máquinas.

### Para Usuários
- ✅ **Visualização em Tempo Real**: Ver o status e o tempo restante de uso das máquinas disponíveis.
- ✅ **Sistema de Filas**: Entrar em uma fila de espera virtual para máquinas ocupadas.
- ✅ **Notificação de Uso**: Ser notificado quando for o primeiro da fila e ter a opção de aceitar ou dispensar o uso da máquina.
- ✅ **Controle de Uso Próprio**: Iniciar, finalizar ou cancelar o próprio uso da máquina.
- ✅ **Autenticação Segura**: Login/Registro com autenticação JWT.

### Recursos Técnicos
- 🔒 **Autenticação JWT** com validade de 24h.
- 🛡️ **Segurança**: Rate limiting, validação robusta com Joi e hash de senhas com bcrypt.
- 🔄 **Atualização de Status**: Uso de **WebSockets** (implementado via `socket.ts` e `broadcastMachineUpdate`) para atualizações de status de máquina e fila em tempo real.
- 📱 **Interface Responsiva** (Tailwind CSS).
- 🗄️ **Banco de Dados** SQLite para desenvolvimento.

---

## 🚀 Tecnologias

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Banco de Dados**: SQLite + SQL puro
- **Comunicação em Tempo Real**: WebSockets (via `ws` ou similar, conforme `socket.ts`)
- **Autenticação**: JWT + bcrypt
- **Validação**: Joi
- **Segurança**: Helmet, CORS, express-rate-limit

### Frontend
- **Framework**: React 18 + TypeScript
- **Roteamento**: React Router DOM v7
- **Estilização**: Tailwind CSS 3
- **HTTP Client**: Axios
- **Build Tool**: Vite 7

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
git clone https://github.com/lucasparente-codigos/lavaja.git
cd lavaja
```

### 2. Instale as dependências

O projeto utiliza um workspace com `package.json` na raiz para gerenciar as dependências do `backend` e `frontend`.

```bash
# Instala todas as dependências do projeto (raiz, backend e frontend)
npm install
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

---

## 📁 Estrutura do Projeto

```
lavaja/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Lógica de negócio (Auth, Company, Machine, Queue, Usage, User)
│   │   ├── models/            # Modelos de dados (Company, Machine, MachineQueue, MachineUsage, User)
│   │   ├── routes/            # Definição de rotas
│   │   ├── services/          # Lógica de negócio complexa (QueueService, UsageService, backgroundJobs)
│   │   ├── middleware/        # Middlewares (auth, errorHandler)
│   │   ├── utils/             # Utilitários
│   │   ├── database.ts        # Configuração do banco
│   │   ├── socket.ts          # Configuração de WebSockets para tempo real
│   │   └── index.ts           # Entry point
│   ├── data/                  # Banco SQLite
│   ├── .env                   # Variáveis de ambiente
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── api/               # Configuração HTTP
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── context/           # Context API (AuthContext)
│   │   ├── pages/             # Páginas da aplicação (Login, Register, Dashboard, Home)
│   │   └── ...
│   ├── .env.local             # Variáveis de ambiente
│   └── ...
│
├── package.json               # Scripts raiz
└── README.md
```

---

## 🔌 API Endpoints

O projeto implementa as seguintes funcionalidades completas:

| Funcionalidade | Endpoint | Método | Descrição |
| :--- | :--- | :--- | :--- |
| **Autenticação** | `/api/auth/login` | `POST` | Login de usuário/empresa. |
| **Usuário** | `/api/users/register` | `POST` | Cadastro de novo usuário. |
| **Empresa** | `/api/companies/register` | `POST` | Cadastro de nova empresa. |
| **Máquinas (Empresa)** | `/api/machines` | `POST` | Cria uma nova máquina. |
| | `/api/machines` | `GET` | Lista as máquinas da empresa autenticada. |
| | `/api/machines/:id` | `PUT` | Atualiza os dados de uma máquina. |
| | `/api/machines/:id` | `DELETE` | Deleta uma máquina. |
| **Uso (Usuário)** | `/api/usage/start/:machineId` | `POST` | Inicia o uso de uma máquina (se livre ou após aceitar fila). |
| | `/api/usage/finish/:usageId` | `POST` | Finaliza um uso ativo (usuário ou empresa). |
| | `/api/usage/cancel` | `POST` | Cancela o uso ativo do usuário. |
| **Fila (Usuário)** | `/api/queue/join/:machineId` | `POST` | Entra na fila de espera da máquina. |
| | `/api/queue/leave/:machineId` | `DELETE` | Sai da fila de espera. |
| | `/api/queue/confirm/:machineId` | `POST` | Confirma ou dispensa o uso após ser notificado. |
| **Público** | `/api/public/companies` | `GET` | Lista todas as empresas cadastradas. |
| | `/api/public/companies/:id` | `GET` | Lista as máquinas de uma empresa específica com status. |

---

## 🛣️ Roadmap

O projeto está em uma fase avançada de desenvolvimento, com as funcionalidades centrais de gerenciamento de máquinas e filas já implementadas.

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

### ✅ Fase 3: Sistema de Máquinas (Completo)
- [x] CRUD de máquinas (empresa)
- [x] Status em tempo real (via WebSockets)
- [x] Controle de uso (iniciar/finalizar)
- [x] Listagem pública de empresas/máquinas

### ✅ Fase 4: Sistema de Filas (Completo)
- [x] Fila de espera por máquina
- [x] Notificação "sua vez" (via polling/WebSockets)
- [x] Gerenciamento de posições
- [x] Auto-avançar fila ao finalizar

### 🚧 Fase 5: Melhorias Futuras (Em Desenvolvimento)
- [ ] Implementação completa de WebSockets para substituir o polling (atualmente híbrido).
- [ ] Notificações push para usuários.
- [ ] Histórico de usos e relatórios.
- [ ] Geolocalização de lavanderias.
- [ ] Integração com pagamentos.
- [ ] Dashboard analytics para empresas.
- [ ] App mobile (React Native).

---

## 🐛 Problemas Conhecidos

### Em Investigação    
- ⚠️ Token expira sem refresh automático.
- ⚠️ Sem paginação nas listagens.
- ⚠️ Polling ainda é usado em algumas partes, deve ser substituído totalmente por WebSockets.

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
- Email: <lucas.parente0808@gmail.com>

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
