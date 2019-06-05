Clubes

### Installation

Clonar repositorio
```sh
$ git clone https://github.com/SorielV/foo.git -b temp
```

[Node.js](https://nodejs.org/) 
[Postgres](https://www.postgresql.org/)

Iniciar servicio de postgres y crear base de datos
```sh
psql -U postgres -W
```
```slq
postgres=# CREATE DATABASE foo;
postgres=# \q
```
Restaurar base de datos
```sh
psql -U postgres -d foo foo/server/database/foo.dump
```

Instalar dependencias and devDepencencias e iniciar el server.

```sh
$ cd foo
$ npm install
$ npm run dev
```
http://localhost:3000
