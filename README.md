# Node Typescript Starter

Node Typescript starter with testing

## Features

- .env file support built in. Uses .env for dev and .test.env for test
- Aliases your project under @myApp, you can change it and add more it the `tsconfig.json` `compilerOptions.paths`. You can make an alias for any path and folder as you wish. Handy for avoiding `../../../` syntax.
- Husky runs prettier on commit, type checking on push.
- Prettier sorts imports on top of the file by import name, config can be found in `.prettierrc.json` `importOrder`. See, https://github.com/trivago/prettier-plugin-sort-imports.
  - The included config places npm level imports at the top followed by imports starting with an "@" and then all other imports.
- Strong use of swc-node for local development and testing for speedy compilation. See, https://github.com/swc-project/swc-node.
- Testing built in with jest and swc-node/jest

## Dependencies

Node

## How to use for development

`npm install`  
`npm run prepare`  
`npm run start:dev`

## How to use for deployment

Note: This assumes you have environment variables included in your machine

`npm run build`
`npm start`

## Commands

### npm run build

Builds the application from ts into js

### npm run start

Starts the built js application with node. This assumes you have environment variables included in your machine

### npm start:dev

Starts the application with swc-node and without any build steps or type checking

### npm test

Runs test with swc-node/jest

### npm run test:watch

Runs test in watch interactive mode
