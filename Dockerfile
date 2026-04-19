FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
# Updated to point to the src folder
CMD ["node", "src/index.js"]