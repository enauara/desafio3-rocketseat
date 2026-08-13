# Projeto de Gerenciamento Financeiro - Fullstack

Sistema completo de gerenciamento de transações e categorias financeiras desenvolvido com React/TypeScript e GraphQL.

## Estrutura do Projeto

### Backend
- **Tecnologia**: Node.js + Express + Apollo Server + GraphQL + Prisma + SQLite
- **Localização**: `/backend`
- **Porta**: 4000

### Frontend  
- **Tecnologia**: React + Vite + TypeScript + GraphQL + TailwindCSS
- **Localização**: `/frontend`
- **Porta**: 5173

## Funcionalidades Implementadas

### Autenticação
- ✅ Signup com email, nome e senha
- ✅ Login com email e senha
- ✅ JWT Authentication com Bearer token
- ✅ Sessão persistida no localStorage
- ✅ Proteção de rotas autenticadas

### Categorias
- ✅ Criar categoria
- ✅ Listar categorias do usuário
- ✅ Atualizar categoria
- ✅ Deletar categoria
- ✅ Isolamento por usuário

### Transações
- ✅ Criar transação (income/expense)
- ✅ Listar transações do usuário
- ✅ Atualizar transação
- ✅ Deletar transação
- ✅ Filtrar por tipo, categoria e período
- ✅ Isolamento por usuário

### Dashboard
- ✅ Visualizar saldo total
- ✅ Receitas do mês
- ✅ Despesas do mês
- ✅ Transações recentes
- ✅ Resumo de categorias

### Interface
- ✅ Página de autenticação (login/signup)
- ✅ Dashboard com resumo financeiro
- ✅ Página de transações com filtros
- ✅ Responsivo e com TailwindCSS
- ✅ Navegação entre páginas

## Como Executar

### Instalação de Dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Configuração de Ambiente

As variáveis já estão configuradas, mas você pode alterá-las:

**Backend (.env)**
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua-chave-secreta"
```

**Frontend (.env)**
```
VITE_BACKEND_URL=http://localhost:4000/graphql
```

### Executar em Desenvolvimento

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Rodará em http://localhost:4000/graphql

# Terminal 2 - Frontend
cd frontend  
npm run dev
# Rodará em http://localhost:5173
```

### Build para Produção

```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

## Testes Realizados

- ✅ Signup com novo usuário
- ✅ Login e geração de JWT
- ✅ Criar categoria autenticado
- ✅ Criar transação autenticado
- ✅ Listar transações
- ✅ GraphQL queries funcionando
- ✅ CORS habilitado
- ✅ Build frontend OK
- ✅ Build backend OK

## Requisitos Atendidos

### Não Funcionais
- ✅ TypeScript (ambos backend e frontend)
- ✅ GraphQL (Schema com Query/Mutation)
- ✅ Prisma (ORM com SQLite)
- ✅ SQLite (banco de dados)
- ✅ React (frontend)
- ✅ Vite (bundler)
- ✅ TailwindCSS (estilos)

### Funcionais
- ✅ Usuário pode criar conta e fazer login
- ✅ Usuário gerencia apenas suas transações e categorias
- ✅ Criar/deletar/editar/listar transações
- ✅ Criar/deletar/editar/listar categorias
- ✅ CORS habilitado
- ✅ .env.example com variáveis necessárias

## Estrutura de Pastas

```
├── backend/
│   ├── src/
│   │   ├── index.ts          # Entrada da aplicação
│   │   ├── schema.ts         # Schema GraphQL
│   │   ├── middleware/       # Autenticação JWT
│   │   ├── resolvers/        # Resolvers GraphQL
│   │   ├── services/         # Prisma client
│   │   └── utils/            # Funções auxiliares
│   ├── prisma/
│   │   └── schema.prisma     # Schema do banco
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── main.tsx          # Entrada React
    │   ├── App.tsx           # Componente principal
    │   ├── pages/            # Páginas da aplicação
    │   ├── components/       # Componentes reutilizáveis
    │   ├── contexts/         # Context API
    │   ├── services/         # Serviços (GraphQL, Apollo)
    │   ├── types/            # TypeScript types
    │   └── utils/            # Funções auxiliares
    ├── .env.example
    └── package.json
```

## Notas

- O banco de dados SQLite é criado automaticamente em `backend/dev.db`
- JWT tem expiração de 7 dias
- Todos os dados são isolados por usuário no banco
- Frontend faz cache automático com Apollo Client
- Senha é criptografada com bcryptjs

