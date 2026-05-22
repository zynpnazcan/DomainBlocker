# 1. Aşama: Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Aşama: Serve
FROM nginx:alpine
# Dosyaları Nginx'e kopyalıyoruz
COPY --from=build /app/dist/mfe1 /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]