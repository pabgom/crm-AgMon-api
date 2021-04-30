# stage 1 building the code
FROM node as builder

WORKDIR /srv
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# CMD node ./build/app.js
