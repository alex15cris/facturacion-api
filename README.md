# Facturacion API

## Prerequisitos

* NodeJS
* MongoDB

## Archivo con variables de entorno .env

```
PORT=8080
DATABASE=mongodb://localhost:27017/facturacion
SECRET=SECRETFORJWTSIGN
OPENSSL_CONF=/tmp/openssl.cnf
GMAIL_USER=cuentagoogle@gmail.com
GMAIL_SECRET=passwordcuentagoogle
WEB_URL=http://localhost:4200
```

## Instalar dependencias

```
npm install
```
## Script de BDD

```
node populatedb mongodb://localhost:27017/facturacion
```
## Iniciar Servidor

```
npm start
```

