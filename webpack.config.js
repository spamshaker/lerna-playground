const createConfig = require('./dev/webpack').default;
// /**
//  *
//  * @type {import('webpack').Configuration['entry']}
//  */
// const entry = {
//   'js/example-lib/1.0.0/example-lib-1.0.0': {
//     import: './packages/example-lib/src/index.ts',
//     dependOn: 'js/react/17.0.2/react-17.0.2'
//   },
//   'js/example-module/1.0.0/example-module-1.0.0': {
//     import: './packages/example-module/src/index.tsx',
//     dependOn: 'js/react/17.0.2/react-17.0.2'
//   },
//   'js/react/17.0.2/react-17.0.2': ['react', 'react-dom']
// };
const entry = {
  'js/example-lib/1.0.0/example-lib-1.0.0': {
    import: './packages/example-lib/src/index.ts'
  },
  'js/example-module/1.0.0/example-module-1.0.0': {
    import: ['./packages/example-module/src/logo.svg', './packages/example-module/src/index.tsx']
  }
};
module.exports = (env, argv) => createConfig(env, { ...argv, entry });
