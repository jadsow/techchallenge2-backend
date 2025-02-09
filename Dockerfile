FROM node:18-alpine

WORKDIR /user/app

COPY package.json ./
RUN npm install

COPY . .

RUN npm i -g npm

COPY .env .env

ARG MONGO_URI
ENV MONGO_URI=$MONGO_URI
ENV PORT=3010

RUN npm run build

EXPOSE 3010

CMD ["node", "dist/main.js"]
