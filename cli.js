#!/usr/bin/env node
'use strict';

var fs = require('fs');
var pkg = require('./package.json');
var argv = require('minimist')(process.argv.slice(2));

var crunchbase = require('crunchbase2');
var nconf = require('nconf');

nconf.argv()
  .env()
  .file({
    file: './config.json'
  });

var has = function(obj, key) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
};

function help() {
  console.log([
    '',
    '  ' + pkg.description,
    '',
    'Usage',
    '  $ crunchbase <organisation> [--key]',
    '',
    'Options',
    '  --key      Set the Crunchbase API key',
    '  --version  Display the current version',
    '  --help     Show the help',
    '',
    'Example',
    '  $ crunchbase Podio',
    '  => Podio, now part of Citrix..',
    ''
  ].join('\n'));
}

if (has(argv, 'help')) {
  help();
  return;
}

if (has(argv, 'version')) {
  console.log(pkg.version);
  return;
}

if (has(argv, 'key')) {
  var key = argv['key'];
  nconf.set('crunchbase:key', key);

  nconf.save(function (err) {
    if (err) {
      return console.log(err);
    }

    fs.readFile('./config.json', function (err, data) {
      console.log('Key is now set to:', key);
    });
  });

  return;
}

if (nconf.get('crunchbase:key') === void 0) {
  throw new Error('crunchbase:key is not set. See `--help`.');
}

console.log(argv);

if (argv._.length > 0) {
  crunchbase.organization(argv._[0], function(error, results) {
    if (error) {
      return console.log(error);
    }

    console.log(results);
  });
}
