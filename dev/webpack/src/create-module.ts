import { ModuleOptions } from 'webpack';
import { createRules } from './create-module-rules';
import { ConfigVariables } from './types';

export function createModule(variables: ConfigVariables): ModuleOptions {
  const rules = createRules(variables);
  return {
    noParse: /node_modules([\\/])(react|react-dom|prop-types)]/,
    rules
  };
}
