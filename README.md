<!-- # Binhotti Flow

Base inicial de um sistema de gestão financeira pessoal em PHP + MySQL.

## Requisitos

- PHP 8.1+
- MySQL 8+
- Apache (XAMPP/Laragon) ou servidor embutido do PHP
- Extensão PDO MySQL habilitada

## Como começar

1. Copie `.env.example` para `.env`.
2. Crie um banco chamado `binhotti_flow`.
3. Importe `database/schema.sql`.
4. Ajuste as credenciais do banco em `.env`.
5. Aponte o servidor web para a pasta `public/`.

Servidor embutido do PHP:

```bash
php -S localhost:8000 -t public
```

Depois acesse:

```text
http://localhost:8000
```

## Estrutura

- `app/Controllers` — recebe as requisições e coordena regras.
- `app/Models` — acesso e representação dos dados.
- `app/Services` — regras de negócio financeiras.
- `app/Middleware` — autenticação e proteção de rotas.
- `app/Views` — HTML/PHP das telas.
- `config` — configurações.
- `database` — schema e futuras migrations/seeds.
- `public` — único diretório público.
- `routes` — definição de rotas.
- `storage` — logs e arquivos internos.

## Próximos passos sugeridos

1. Cadastro.
2. Login/logout.
3. Middleware de autenticação.
4. Cadastro de contas.
5. Categorias.
6. Transações.
7. Dashboard.
8. Cartões e parcelas.
9. Orçamentos mensais.
10. Metas e projeções. -->
