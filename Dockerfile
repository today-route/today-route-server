FROM node:14-alpine

COPY package*.json /

RUN npm install --save-dev

RUN npm install -g pm2

COPY . .

RUN npm run build

RUN ls ./dist
