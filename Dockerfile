FROM node:18-alpine

COPY ["package.json", "package-lock.json*", "./"]
COPY "build" "./"

RUN npm install --production --ignore-scripts

CMD [ "node", "index.js" ]