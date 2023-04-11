FROM node:14

WORKDIR /test_dockerize
COPY package.json .
RUN npm install
COPY . .
CMD npm start
EXPOSE 3316