import path from 'path';
import { Configuration } from 'webpack';
import { ConfigVariables } from './types';
import { pascalCase } from './utils';

export const createOutput = ({ context, isProduction, name, scope }: ConfigVariables): Configuration['output'] => {
  const library = ['Libs', pascalCase(scope), name && pascalCase(name)].filter(Boolean) as string[];
  return {
    path: path.resolve(context, 'dist'),
    filename: `[name]${isProduction ? '.min' : ''}.js`,
    library: {
      name: library,
      type: 'window'
    },
    chunkLoadingGlobal: '_chunks',
    publicPath: 'auto',
    devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]',
    devtoolNamespace: [scope, name].filter(Boolean).join('/')
    // pathinfo: false
  };
};
