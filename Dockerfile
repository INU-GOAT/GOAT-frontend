# Dockerfile

FROM node:19.6.1-alpine3.17

WORKDIR /app

# package.json 복사 및 npm 설치
COPY package.json .
RUN npm install

# .env 파일 복사
COPY .env .

# 소스 코드 복사
COPY . .

# 3000번 포트 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]

