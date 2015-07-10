# crunchbase-cli [![Build Status](http://img.shields.io/travis/srn/crunchbase-cli.svg?style=flat-square)](https://travis-ci.org/srn/crunchbase-cli) [![Dependency Status](http://img.shields.io/gemnasium/srn/crunchbase-cli.svg?style=flat-square)](https://gemnasium.com/srn/crunchbase-cli)

> Simple command line interface for communicating with the Crunchbase API

## Install

```$ npm install crunchbase-cli -g```

## Usage

### Set API key

```
$ crunchbase --key=<key>
```

If you don't have a key for the Crunchbase API you can register one at http://developer.crunchbase.com

### CLI

```
  $ crunchbase <organisation> [--key]

Options
  --key      Set the Crunchbase API key
  --version  Display the current version
  --help     Show the help

Example
  $ crunchbase Podio
  => Podio, now part of Citrix..
  
```

## License

MIT © [Søren Brokær](http://srn.io)
