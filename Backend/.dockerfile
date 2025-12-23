FROM node:24-alpine

WORKDIR /app

COPY ./package*.json .
RUN npm install

COPY ./index.js .
EXPOSE 3000

ARG APP_VERSION=1.0.0
ENV VERSION=${APP_VERSION}

ENV SECRET=""
# docker run -p 3000:3000 --env SECRET="abc123" verison-ex08a

CMD ["node", "./index.js"]