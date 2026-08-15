FROM node:22-alpine

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev git bash

WORKDIR /opt/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "develop"]