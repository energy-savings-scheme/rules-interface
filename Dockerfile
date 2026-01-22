FROM node:14.21.3-slim

RUN mkdir app

WORKDIR /app

COPY . .

RUN YARN_IGNORE_ENGINES=true yarn install

EXPOSE 3000

CMD ["yarn", "run", "start"]
