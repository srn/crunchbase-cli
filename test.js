'use strict';

var assert = require('assert');
var childProcess = require('child_process');

var fs = require('fs');

describe('cli', function () {

  describe('key', function () {

    beforeEach(function (done) {
      fs.unlink('./config.json', function () {
        done();
      });
    });

    it('should set key correctly', function (done) {
      var key = 'a1337key';

      childProcess.execFile('./cli.js', ['--key=' + key], function (err, stdout) {
        fs.readFile('./config.json', function (err, contents) {
          assert.equal(JSON.parse(contents).crunchbase.key, key);

          done();
        });
      });
    });

    it('should throw err if key is not set', function (done) {
      childProcess.execFile('./cli.js', function (err, stdout) {
        assert(err instanceof Error);

        done();
      });
    });

  });

});
