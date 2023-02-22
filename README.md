# Node Typescript Starter

Node Typescript starter with testing

## Features

- Testing built in with jest.
- Aliases your project under @myApp, you can change it and add more it the `tsconfig.json` `compilerOptions.paths`.
- Husky runs prettier on commit, type checking on push.
- Prettier sorts imports on top of the file by import name, config can ba found in `.prettierrc.json` `importOrder`. See, https://github.com/trivago/prettier-plugin-sort-imports.
- Strong use of SWC for local development and testing for speedy compilation. See, https://github.com/swc-project/swc-node.

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

### npm run start

Starts the built js application with node

### npm start:dev

Starts the application with swc and without any build steps or type checking

### npm test

Runs test with swc

### npm run test:watch

Runs test with swc watch interactive command
