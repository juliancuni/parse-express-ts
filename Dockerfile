FROM node:16.13.1-alpine as builder
RUN mkdir -p /app/node_modules 
WORKDIR /app

COPY package*.json ./
RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g ts-node

RUN npm install
RUN npm run build

FROM node:16.13.1-alpine
RUN mkdir -p /app/node_modules
WORKDIR /app
COPY package*.json ./

RUN npm install --production
COPY --from=builder /app/dist ./dist
EXPOSE 1337
CMD [ "node", "dist/src/index.js" ]
