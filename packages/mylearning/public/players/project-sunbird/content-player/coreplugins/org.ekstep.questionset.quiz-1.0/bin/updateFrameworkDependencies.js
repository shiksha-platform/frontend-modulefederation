#!/usr/bin/env node

var rimraf = require('rimraf');
var execSync = require('child_process').execSync;

rimraf.sync('bower_components/ekstep-content-plugin-dev-common');
rimraf.sync('node_modules/ekstep-content-plugin-dev-common');
execSync('npm install', { stdio: 'inherit' });
require('ekstep-content-plugin-dev-common/bin/updateFrameworkDependencies.js');
