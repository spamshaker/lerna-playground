import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { ConfigVariables, Optimization } from './types';

export function createOptimization({ env: { WEBPACK_SERVE }, isProduction }: ConfigVariables): Optimization {
  const filename = isProduction ? '[name].min.js' : '[name].js';
  return WEBPACK_SERVE
    ? {}
    : {
        runtimeChunk: {
          name: 'runtime-webpack'
        },
        minimizer: isProduction ? [`...`, new CssMinimizerPlugin()] : undefined,
        portableRecords: true,
        minimize: isProduction,
        splitChunks: {
          cacheGroups: {
            'runtime-jsx': {
              chunks: 'all',
              enforce: true,
              test: /react[\\/](.*runtime)/,
              reuseExistingChunk: true,
              name: 'runtime-jsx',
              filename
            },
            'runtime-loaders': {
              chunks: 'all',
              enforce: true,
              test: /node_modules[\\/](.*loader)/,
              reuseExistingChunk: true,
              name: 'runtime-loaders',
              filename
            }
            // styles: {
            //   type: 'css/mini-extract',
            //   chunks: 'all',
            //   enforce: true
            // }
          }
          // chunks: 'all'
          // maxInitialRequests: Infinity,
          // minSize: 0,
          // cacheGroups: {
          //   defaultVendors: {
          //     enforce: true,
          //     filename: '[name].bundle.js'
          //   }
          // }
        }
      };
}
