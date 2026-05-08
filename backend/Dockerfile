#chon image base nhe va on dinh
FROM node:22-alpine
#tao thu muc lam viec trong container
WORKDIR /app
#copy file quan ly thu vien de tan dung Docker cache
COPY package*.json ./
#cai dat thu vien
RUN npm install
#copy ma nguon vao container
COPY . .
# Mo cong Node.js chay
EXPOSE 5000 
# Build ứng dụng
RUN npm run build
# Khoi tao ung dung bang lenh start thay vi dev cho production
CMD ["npm", "run", "start"]