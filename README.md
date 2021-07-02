# Goomer backend challenge

## ✨ O Projeto
O projeto consiste em uma API para cadastro, alteração, listagens e exclusões de restaurantes e seus produtos, utilizando Node e Typescript.

Nesse README.md busquei trazer bastante argumentações sobre o porque utilizei essas ferramentas e técnicas no projeto.

Veja quais foram os [requisitos para esse desafio](./docs/CHALLENGE.md).

## 📜 Manual de execução

Para rodar essa aplicação localmente você pode seguir uma das três opções descritas a seguir.

### Opção 1) Rodando com docker compose

Requisitos de ambiente:
- [Docker](https://www.docker.com/products/docker-desktop) versão 20.10.7 ou superior

Após instalar os pré-requisitos, na raiz do projeto você pode rodar o seguinte comando para subir a aplicação:

```sh
docker compose up development
```
> Aguarde o container subir e pronto, você já pode acessar a aplicação em: http://localhost:3333 😀

**Production Ready:** Se você deseja executar a versão built que vai rodar em produção, execute o comando `docker compose up production`

### Opção 2) Rodando manualmente

Requisitos de ambiente:
- [Node](https://nodejs.org/en/) versão 14.17.1 ou superior
- [Yarn](https://yarnpkg.com/) versão 1.22.10 ou superior

Primeiro, rode o comando `yarn` na raiz do projeto para instalar as dependências

Antes de continuar, precisaremos ter uma base de dados iniciada, pra isso você pode executar o comando `docker compose up goomerDatabase` ou fazer isso manualmente.

Se optar por subir uma base de dados manualmente certifique-se de ter as variáveis de ambiente sobre conexão com banco de dados configuradas, você pode renomear o arquivo .env.example para .env e adicionar os dados de acesso ao seu banco de dados.

Opcionalmente você pode subir uma instância do redis com o comando `docker compose up goomerRedis` ou instalar o redis na sua maquina manualmente, mas não se preocupe, pois caso a aplicação não consiga se conectar com o redis ela irá subir normalmente.

Agora você já pode executar a aplicação execute o comando `yarn dev`

> Aguarde a aplicação subir e pronto, você já pode acessar a aplicação em: http://localhost:3333 😀

**Production Ready:** Se você deseja executar a versão built que vai rodar em produção, execute o comando `yarn build` para gerar o código final e use o comando `yarn start` para servir a aplicação.

### Opção 3) Rodando com docker run

Requisitos de ambiente:
- [Docker](https://www.docker.com/products/docker-desktop) versão 20.10.7 ou superior

Essa é pra quem gosta de ativar o modo raiz nível 4 😅 ou pra quando houver alguma restrição à usar o compose. Mas se você só quer rodar local mesmo recomendo usar a opção 1.

Primeiro precisaremos fazer a build da imagem, pra isso rode:

```sh
docker build --file Dockerfile --tag backend --target back_development .
```

Opcionalmente você pode subir uma instância de redis com o seguinte comando:
```sh
docker run --name goomerRedis  -p 6379:6379 -d redis redis-server --bind '0.0.0.0'
```

> Caso você não suba essa instância a aplicação funcionará normalmente, porém sem os benefícios na velocidade da resposta da API com cache.

Agora vamos subir um container para a base de dados já especificando o arquivo DDL para ser executado:
```sh
docker run --name goomerDatabase -e POSTGRES_PASSWORD=postgres -v ${PWD}/docs/DDL-DML.sql:/docker-entrypoint-initdb.d/docker_postgres_init.sql -d postgres
```

E por fim, para subir o backend, na raiz do projeto execute:
```sh
docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3333:3333 -e REDIS_HOST=host.docker.internal -e DATABASE_HOST=host.docker.internal -e NODE_ENV=development backend
```

> Espere os containers subirem e pronto, você já pode acessar a aplicação em: http://localhost:3333 😀


**Production Ready:** Se você deseja executar a versão built que vai rodar em produção, apenas troque o --target para `back_production` ao invés de `back_development` quando for gerar a imagem, o resto do processo é o mesmo.

## Banco de dados e modelagem

Dentre os 3 bancos SGBD's para SQL que já utilizei (Postgres, MariaDB/MySQL e SQL Server), eu optei em usar o Postgres porque:

- É um projeto Open Source, sendo assim gratuíto não sendo necessário arcar com custos de licença

- Tem uma comunidade bem grande, então para quase qualquer problema se encontra facilmente soluções em forums na internet.

- Suporta queries em paralelo que usam diferentes núcleos do processador

Sendo assim, esse foi a modelagem do projeto que elaborei com base no problema:


<img src="./docs/media/DER.png" />

[Você pode ver o DDL clicando aqui](./docs/DDL-DML.sql)

## Outras decisões técnicas

- Optei por adicionar redis para fazer cache no endpoint de listagem de produtos e restaurantes, assim aumentando a performance e diminuindo o processamento do lado do servidor, se esse projeto fosse para produção usando um serviço de custo dinâmico como Lambda da AWS, teríamos uma redução de custos significativa no longo prazo, além de tornar a experiência do usuário final melhor por ter que esperar menos.
  - O cache está configurado para durar 1 minuto, porém isso seria algo parametrizável pela variável de ambiente `REDIS_CACHE_DURATION` e esse tempo seria decidido dependendo do cenário tivermos em ambiente de produção.
  - A chave do cache é uma string gerada combinado a rota e os query params
  - Quando a API responde com dados em cache, são adicionados os headers `cache_updated_at` e `cache_invalidation_at` para a aplicação cliente que possa se integrar saber quando esses dados foram atualizados.

- Optei por utilizar UUID's ao invés de números sequenciais porque essa é uma técnica que pode garantir um pouco mais segurança dado que seria mais difícil de descobrir os recursos da mesma natureza, são praticamente infinitos e é a melhor forma de identificar e relacionar e relacionar objetos dentre um grupo de API's ou bancos de dados distribuídos.

## Testes unitários

Para a maioria dos casos eu utilizei da prática TDD criando os testes antes de criar a funcionalidade.

- Para gerar cobertura de testes rode `yarn test --coverage`

**Cobertura de Testes**

<img src="./docs/media/coverage.png" />

## O que poderia melhorar

- Acredito que eu deveria ter salvo os horários de funcionamento como um campo string apenas, acho que compliquei demais sem necessidade, acredito que eu só precisaria ter feito dessa forma com validações de dias da semana e horários se meu objetivo fosse trabalhar com uma agenda ou algo assim, por outro lado se fosse apenas exibir como uma descrição em um app de delivery uma simples string seria mais interessante rs 😅.

- Eu poderia colocar algumas lógicas pra tornar aqueles arquivos de Mock das repositories em factories e ao adicionar alguns testes de integração usando a lib `supertest` pra fazer as requests e assim poder garantir o body que o endpoint estária retornando para o cliente.

## Considerações finais

Fico a disposição para tirar dúvidas e sempre estarei aberto a criticas construtivas e sugestões de melhorias, obrigado pela atenção!

Contato: gabrieldnrodrigues@gmail.com
Linkedin: https://www.linkedin.com/in/gabrieldissotti/
