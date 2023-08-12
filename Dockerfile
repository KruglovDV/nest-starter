FROM node:19.8.1

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

COPY . .

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "run", "start:prod"]

