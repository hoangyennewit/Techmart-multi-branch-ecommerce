#GD1: Build mã nguồn với Node.js
FROM node:22-alpine AS build-stage

WORKDIR /app

#Copy file quản lý thư viện
COPY package*.json ./
RUN npm install

#Copy toàn bộ code và build
COPY . .
RUN npm run build

#GD2: chạy ứng dụng với Nginx để phục vụ file tĩnh
FROM nginx:stable-alpine AS production-stage

#Copy thư mục dist từ stage 1 vào thư mục mặc định của Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

#Copy file cấu hình Nginx(tránh lỗi 404)
COPY nginx.conf /etc/nginx/conf.d/default/.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


