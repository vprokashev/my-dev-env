#! /usr/bin/env node

process.removeAllListeners('warning');

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const packageJsonPath = path.join(__dirname, '../package.json');

const packageJson = require(packageJsonPath);

const outdated = childProcess.spawn(
  'npm',
  [ '--loglevel=error', 'outdated', '--json' ],
  { shell: process.platform === 'win32' }
);
outdated.stdout.on('data', (data) => {
  const packageVersions = JSON.parse(data);
  Object.keys(packageVersions).forEach((packageName) => {
    const versions = packageVersions[packageName];
    const currentMajor = getMajorVersion(versions.current);
    const latestMajor = getMajorVersion(versions.latest);
    if (currentMajor < latestMajor) {
      // todo update from `npm view [package] versions`
    }
    if (packageJson.dependencies[packageName]) {
      packageJson.dependencies[packageName] = versions.latest;
    }
    if (packageJson.devDependencies[packageName]) {
      packageJson.devDependencies[packageName] = versions.latest;
    }
  });
  const packageStr = JSON.stringify(packageJson, null, 2);
  fs.writeFileSync(packageJsonPath, packageStr);
});

function getMajorVersion(semVersion) {
  return Number.parseInt(semVersion.split('.')[0], 10);
}
