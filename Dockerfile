# DockerFile
# DockerHub에서 버전에 맞는 이미지를 찾아주자
FROM node:19.6.1-alpine3.17

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "start"]

