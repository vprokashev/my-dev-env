#!/usr/bin/env node

const { Command, Option } = require('commander');
const program = new Command();
const path = require('path');
const projectRoot = process.cwd();
const pkg = require(path.join(projectRoot, 'package'));
const defaultSettingsPath = path.join(projectRoot, 'settings.js');
const { moduleIsAvailable } = require('../src/utils');

program
  .version(pkg.version)
  .option(
    '-s, --settings-path <absolutePath>',
    'Absolute path for settings.js file with',
    defaultSettingsPath
  )
  .addOption(new Option('-m, --mode <NODE_ENV>', 'Environment mode')
    .choices([ 'development', 'production' ])
    .makeOptionMandatory())
  .parse(process.argv);

const programOptions = program.opts();

if (!moduleIsAvailable(programOptions.settingsPath)) {
  throw new Error('Settings file not exist!');
}

const settings = require(programOptions.settingsPath);

process.env.NODE_ENV = programOptions.mode;

if (programOptions.mode === 'development') {
  const config = require('../src/webpack.config.development')(projectRoot, settings);
  const app = require('../src/app')(config, settings);
  app.listen(settings.DEV_PORT, function () {
    console.log(`Building server listening on port ${ settings.DEV_PORT }`);
  });
}
if (programOptions.mode === 'production') {
  const config = require('../src/webpack.config.production')(projectRoot, settings);
  const webpack = require('webpack');
  const compiler = webpack(config);
  compiler.run();
}

