# Build the frontend application using Node.js
FROM node:24.16.0-slim AS builder

WORKDIR /app 

COPY package.json pnpm-lock.yaml ./

# Enable Corepack and prepare pnpm
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

RUN pnpm ci

COPY . .

RUN pnpm run build

# Use Nginx to serve the built frontend application
FROM nginx:stable-alpine3.23-slim AS production
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]