#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

yargs(hideBin(process.argv)).command(
  'start',
  'Start the api server',
  yargs => {
    return yargs
      .option('host', {
        alias: 'h',
        describe: 'the host to bind to',
      })
      .demandOption('host')
      .option('port', {
        alias: 'p',
        describe: 'the port to bind to',
        type: 'number',
        default: 3001,
      })
      .demandOption('port');
  },
  argv => {
    console.log('Start server not implemented');
  },
).argv;
