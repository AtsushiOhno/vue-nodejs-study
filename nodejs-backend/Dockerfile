FROM node:17.5.0-buster-slim

WORKDIR /usr/app

COPY file ./
RUN npm install && \
    apt update && \
    apt install sqlite -y

CMD ["npm", "start"]