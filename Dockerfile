FROM node:24.22.2

RUN mkdir app

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "start"]
