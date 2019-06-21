#!/usr/bin/env node
require ('yargs')
  .command (
    'convert [file]',
    'Either a specific filename `test.feature` or a Glob string `*.feature` to capture more than one file',
    yargs => {
      yargs.positional ('file', {
        describe: 'filename or file glob to specify',
        default: '',
      });
    },
    argv => {
      require ('../lib/parser') (argv.file, {
        output: argv.output,
        debug: argv.debug,
        dryrun: argv.dry,
      });
    }
  )
  .option ('dry', {
    alias: 'd',
    default: false,
  })
  .option ('debug', {
    alias: 'D',
    default: false,
  })
  .option ('verbose', {
    alias: 'v',
    default: false,
  })
  .option ('output', {
    alias: 'o',
    default: '',
  }).argv;
