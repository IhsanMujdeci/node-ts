FROM node:18-alpine

COPY ["package.json", "package-lock.json*", "./"]
COPY "build" "./build"

RUN npm install --omit=dev

CMD [ "npm", "start" ]