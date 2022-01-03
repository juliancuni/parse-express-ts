FROM node:16.13.1-alpine as builder
USER node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./
RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g ts-node

RUN npm install
COPY --chown=node:node . .
RUN npm run build

FROM node:16.13.1-alpine
USER node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./

RUN npm install --production
COPY --from=builder /home/node/app/dist ./dist
COPY --chown=node:node .env .
COPY --chown=node:node  /config ./config
COPY --chown=node:node  /public ./public
EXPOSE 2700
CMD [ "node", "dist/src/index.js" ]
