# Binhotti Flow

Assistente financeiro pessoal feito com Next.js, Node.js, TypeScript, PostgreSQL e Prisma.

## Funcionalidades

- Cadastro, login e sessão segura por cookie HTTP-only
- Contas com saldo inicial, edição e ativação/desativação
- Receitas, despesas e transferências entre contas
- Dashboard com saldo consolidado e resumo mensal
- Interface responsiva pronta para Vercel

## Desenvolvimento local

1. Execute `pnpm install`.
2. Copie `.env.example` para `.env` e preencha as variáveis.
3. Execute `pnpm db:push`.
4. Execute `pnpm dev`.

## Deploy

Conecte o repositório à Vercel, adicione PostgreSQL pelo Marketplace e configure `DATABASE_URL` e `AUTH_SECRET`.
