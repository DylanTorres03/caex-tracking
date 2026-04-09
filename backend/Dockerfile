# ---- Builder ----
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---- Production ----
FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
RUN npx prisma generate

COPY --from=builder /app/dist ./dist

EXPOSE 3001

# Sincroniza schema con la DB, siembra datos si está vacía, luego arranca
CMD ["sh", "-c", "npx prisma db push && npx prisma db seed && node dist/index.js"]
