FROM node:18-alpineh@rdstyleklan

COPY ["package.json", "package-lock.json*", "./"]
COPY "build" "./build"

RUN npm install --production --ignore-scripts

CMD [ "npm", "start" ]