import { Entry } from 'webpack';
import { ConfigVariables } from './types';

const createEntryFromEsNext = ({ esnext, name, scope }: ConfigVariables): Entry => ({
  [name || scope]:
    typeof esnext === 'object' && 'main' in esnext && esnext.main
      ? esnext.main
      : (typeof esnext === 'string' && esnext) || './src/index.tsx'
});

export const createEntry = (variables: ConfigVariables): Entry =>
  variables.entry ? variables.entry : createEntryFromEsNext(variables);
