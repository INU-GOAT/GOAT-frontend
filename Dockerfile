# Dockerfile

FROM node:19.6.1-alpine3.17

WORKDIR /app
COPY package.json .
RUN npm install

# .env 파일을 복사하여 이미지에 포함
COPY .env .

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
