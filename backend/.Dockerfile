FROM node:alpine3.14

RUN mkdir -p /usr/app/backend
WORKDIR /usr/app/backend

COPY package.json /usr/app/backend
COPY package-lock.json /usr/app/backend
COPY . /usr/app/backend

RUN npm install

EXPOSE 8001
CMD npm run dev