FROM node:18-alpine

COPY ["package.json", "package-lock.json*", "./"]
COPY "build" "./build"

# --ignore-scripts wont run "prepare" script which involves running husky.
RUN npm install --production --ignore-scripts

CMD [ "npm", "start" ]