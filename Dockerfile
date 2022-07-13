FROM node:16.14.2

WORKDIR /home/react/app

COPY package*.json ./

RUN npm i --save --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
