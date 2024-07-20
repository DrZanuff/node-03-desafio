# App

API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

### Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Como usar

Suba a imagem docker
`docker compose up -d`

Adicione a url de do banco no arquivo .env
`DATABASE_URL={URL_DO_BANCO}`

Rodar o projeto localmente
`npm run dev`

Após fazer modificações no arquivo prisma.schema, rode para gerar a tipagem
`npx prisma generate`

Para fazer uma nova migration no projeto
`npx prisma migrate dev`

Para realizar um teste especifico
`npm run test --path/to/test.spec.ts`

## Comon Errors

Para ver no linux qual serviço está usando uma porta use este comando:

`sudo lsof -i:5432` (5432 é o numero da porta)

Então mate o serviço

`sudo kill 1111` (1111 é o numero do PID serviço)
