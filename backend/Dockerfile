FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY . .
RUN mkdir -p storage/files && chown -R node:node storage

USER node

EXPOSE 5000

CMD ["node", "server.js"]