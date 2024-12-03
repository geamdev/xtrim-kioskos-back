FROM node:21-alpine3.19

WORKDIR /usr/src/app

RUN npm config set strict-ssl false

COPY package*.json ./
COPY pnpm-lock.yaml ./
# COPY prisma ./prisma/

RUN npm install -g pnpm

RUN pnpm install --force --verbose
# RUN pnpm add -D prisma@latest
# RUN pnpm add @prisma/client

# RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]
