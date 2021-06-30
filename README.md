# Goomer backend challenge


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
docker run --name goomerDatabase -e POSTGRES_PASSWORD=postgres -v ${PWD}/docs/DDL.sql:/docker-entrypoint-initdb.d/docker_postgres_init.sql -d postgres
```

E por fim, para subir o backend, na raiz do projeto execute:
```sh
docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3333:3333 -e REDIS_HOST=host.docker.internal -e DATABASE_HOST=host.docker.internal -e NODE_ENV=development backend
```

> Espere os containers subirem e pronto, você já pode acessar a aplicação em: http://localhost:3333 😀


**Production Ready:** Se você deseja executar a versão built que vai rodar em produção, apenas troque o --target para `back_production` ao invés de `back_development` quando for gerar a imagem, o resto do processo é o mesmo.
