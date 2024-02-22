FROM node:20.10.0-alpine
LABEL org.opencontainers.image.source=https://github.com/uhurutek/openai-connect-nodeapp
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app
COPY . .
USER node
RUN yarn install
