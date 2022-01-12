# Node Typescript Starter

Node Typescript starter with testing

## Features

- Dev mode transpiling ts with nodemon like re-running.
- Testing built in with jest.
- Github actions on push and pr to master that build and test the application
- Environment variable loading from file built in.
- Aliases your project under @myApp, you can change it the tsconfig.json
- Husky runs prettier on commit
- bin folder contains cli tool to start server application when implemented

## How to use

`npm install`  
`npm run prepare`  
`npm start:dev`

## Commands

### npm run start:dev

Load environment variables from `.env` and build ts code, watch for code changes and rebuilds ts to js and respawns node.

### npm test

Runs test with ts-jest

### npm run test:watch

Runs test with ts-jest watch interactive command

### npm run build

Build ts `./src` into js `./build` folder
