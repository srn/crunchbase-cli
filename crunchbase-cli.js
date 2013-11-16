var requirejs = require('requirejs').config({nodeRequire: require, baseUrl: ''});

requirejs(['http', 'commander', 'underscore.string', 'fs', 'nconf', 'crunchbase'], function (http, commander, _s, fs, nconf, crunchbase) {
  var configFilePath = 'config.json';

  nconf.argv()
    .env()
    .file({ file: configFilePath });

  commander
    .version('0.0.1');

  commander
    .command('key <key>')
    .description('set the api used to communicate with the crunchbase api')
    .action(function (key) {
      nconf.set('crunchbase:key', key);

      nconf.save(function (error) {
        fs.readFile(configFilePath, function (error, data) {
          console.dir(JSON.parse(data.toString()));
        });
      });
    });

  commander
    .command('* <company>')
    .description('retrieve single company entry information')
    .action(function (company) {
      crunchbase.init(nconf.get('crunchbase:key'));

      crunchbase.getEntity('company', company, function (error, entity) {
        var overview = _s.stripTags(entity.overview.replace(/\n$/, '')).trim();
        console.log(overview);
      });
    });

  commander.parse(process.argv);
});