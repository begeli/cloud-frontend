FROM node:latest
WORKDIR '/app'
COPY package.json .
RUN npm i forever

COPY . .
CMD ["npm","start"]
