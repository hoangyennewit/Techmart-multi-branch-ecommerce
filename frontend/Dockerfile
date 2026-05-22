FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy toàn bộ code
COPY . .

# Vite chạy mặc định cổng 5173
EXPOSE 5173

# Chạy lệnh dev để có Hot-Reload
CMD ["npm", "run", "dev", "--", "--host"]
