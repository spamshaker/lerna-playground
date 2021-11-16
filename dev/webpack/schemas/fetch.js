#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const schemas = [
  {
    url: 'https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/package.json',
    output: './PackageJson.json',
    title: 'PackageJson'
  }
];
schemas.forEach(({ output, title, url }) =>
  axios
    .get(url)
    .then(({ data }) => {
      if (title) {
        data.title = title;
      }
      fs.writeFileSync(path.resolve(__dirname, output), JSON.stringify(data, null, 2), { encoding: 'utf-8' });
    })
    // eslint-disable-next-line no-console
    .catch(console.log)
);
