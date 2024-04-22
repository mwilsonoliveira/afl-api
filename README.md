## Instalação do Backend

Esta documentação contém instruções para configurar e executar o backend do projeto.

### Pré-requisitos

- Node.js instalado (v16.0.0 ou superior)
- npm (Node Package Manager) ou Yarn
- PostgreSQL instalado e em execução

### Passo 1: Clonar o repositório

Clone o repositório do projeto do GitHub:

```bash
git clone https://github.com/mwilsonoliveira/afl-api.git
```

### Passo 2: Instalar as dependências

Acesse o diretório do projeto e instale as dependências do backend usando npm ou yarn:

cd seu-projeto/afl-api

```
npm install
ou
yarn install
```

### Passo 3: Configurar as variáveis de ambiente

Crie um arquivo .env na raiz do diretório backend e defina as variáveis de ambiente necessárias.

Você pode usar o arquivo .env.example como referência.

### Passo 4: Criando as migrations

Para termos um banco de dados que já tenha alguma informação é necessário rodar o comando

```
npx prisma migrate dev
```

### Passo 5: Executar o backend

Inicie o servidor Nest:

```
npm run start:dev
# ou
yarn start:dev
```

O backend estará disponível em http://localhost:3000.

### Passo 5: Populando o banco de dados

Para popular o banco de dados, rodar o comando:

```
npx prisma db seed
```

### Passo 5: Testando as rotas

Você pode usar o Postman ou qualquer outra ferramenta para testar as rotas do backend, que estarão disponíveis em http://localhost:3000.

### Rotas disponíveis

- POST /login: Rota para autenticar o usuário e receber um token de acesso.
- POST /users: Rota para criar um usuário.

- GET /companies: Rota para obter todas as empresas.
- GET /companies/:id: Rota para obter uma empresa.
- POST /companies/create: Rota para criar uma empresa
- POST /companies/delete/:id: Rota para deletar uma empresa.

- GET /contracts: Rota para obter contratos.
- GET /contracts/:id: Rota para obter um contrato.
- POST /contracts/create: Rota para criar um contrato.
- POST /contracts/delete/:id: Rota para deletar um contrato.
