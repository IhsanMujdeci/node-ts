# Node Typescript Starter

Node Typescript starter with testing

## Features

- Testing built in with jest.
- Aliases your project under @myApp, you can change it the tsconfig.json
- Husky runs prettier on commit

## Dependencies

Node version at least latest 12

## How to use for development

`npm install`  
`npm run prepare`  
`npm run start:dev`

## How to use for deployment

`npm run build`  
`npm start`

## Commands

### npm run build

Builds the application from ts into js

### npm start

Starts the built js application with node

### npm start:dev

Starts the application with swc and without any build steps or type checking

### npm test

Runs test with swc

### npm run test:watch

Runs test with swc watch interactive command
