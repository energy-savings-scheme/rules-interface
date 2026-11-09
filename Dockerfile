FROM node:14.21.3-slim

RUN mkdir app

WORKDIR /app

COPY yarn.lock .
COPY . .

RUN YARN_IGNORE_ENGINES=true yarn install --frozen-lockfile

EXPOSE 3000

CMD ["yarn", "run", "start"]
