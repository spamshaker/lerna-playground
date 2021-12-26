import { Configuration } from 'webpack';
import { ConfigVariables } from './types';

export const createExternals = ({ env: { WEBPACK_SERVE } }: ConfigVariables): Configuration['externals'] =>
  WEBPACK_SERVE
    ? {}
    : {
        react: 'React',
        'react-dom': 'ReactDOM',
        'object-assign': ['Object', 'assign'],
        redux: 'Redux',
        'react-redux': 'ReactRedux',
        '@reduxjs/toolkit': 'RTK'
        // 'react/jsx-dev-runtime': {
        //   commonjs: 'jsxDEV'
        // }
      };
