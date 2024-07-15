# App

API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

### Regras da aplicação

- [ ] Deve ser possível cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [ ] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

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
Examplo:
`npm run test --back-end/src/helpers/seconds-to-time/seconds-to-time.spec.ts`

## Comon Errors

Para ver no linux qual serviço está usando uma porta use este comando:

`sudo lsof -i:5432` (5432 é o numero da porta)

Então mate o serviço

`sudo kill 1111` (1111 é o numero do PID serviço)
