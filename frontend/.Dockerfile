FROM node:alpine3.14


RUN mkdir -p /usr/app/frontend
WORKDIR /usr/app/frontend

COPY package.json /usr/app/frontend
COPY package-lock.json /usr/app/frontend

RUN npm install

COPY . /usr/app/frontend
EXPOSE 3000
CMD ["npm", "run", "start"]