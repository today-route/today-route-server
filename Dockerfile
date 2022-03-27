FROM node:16.14.2-alpine

COPY . .

RUN npm install --save-dev

RUN npm install -g pm2

RUN npm run build

ENTRYPOINT ["pm2-runtime", "/dist/main.js"]
