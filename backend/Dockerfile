#chon image base nhe va on dinh
FROM node:18-alpine
#tao thu muc lam viec trong container
WORKDIR /app
#copy file quan ly thu vien de tan dung Docker cache
COPY package*.json ./
#cai dat thu vien
RUN npm install
#copy ma nguon vao container
COPY . .
#Mo cong Node.js chay
EXPOSE 3000 
#khoi tao ung dung
CMD ["npm", "start"]