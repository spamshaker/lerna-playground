const fs = require('fs');
const path = require('path');

let rootPath = '../';
while (!fs.existsSync(path.resolve(rootPath, 'package.json'))) {
  rootPath += '../';
}
const pkgJsonPath = path.resolve(rootPath, 'package.json');

const json = require(pkgJsonPath);
const { eslintConfig = { extends: [] } } = json;
const configName = '@lerna-playground';
eslintConfig.extends = (eslintConfig.extends.filter((item) => item !== configName) || []).concat(configName);
fs.writeFileSync(pkgJsonPath, JSON.stringify({ ...json, eslintConfig }, null, 2));
