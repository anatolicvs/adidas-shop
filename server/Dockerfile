FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install nodemon -g

COPY . .

EXPOSE 4000
CMD [ "npm", "start" ]
