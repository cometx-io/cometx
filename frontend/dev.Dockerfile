FROM node:latest

RUN mkdir -p /opt/app
ENV NODE_ENV=development PORT=3000
EXPOSE 3000

WORKDIR /opt/app

COPY package.json yarn.lock /opt/app/

RUN yarn

COPY . /opt/app

CMD [ "yarn", "run", "dev" ]