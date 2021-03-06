FROM node:16.13.1-alpine 
RUN apk update

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

COPY src /app/src
COPY cloud /app/cloud
COPY mail /app/mail

RUN ls -a

RUN npm install
RUN npm run build

EXPOSE 1337

CMD [ "node", "./dist/src/index.js" ]
