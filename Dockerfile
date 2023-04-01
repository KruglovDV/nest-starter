FROM node:19.8.1

WORKDIR /app

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

