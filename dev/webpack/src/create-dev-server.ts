import { ConfigVariables, DevServer } from './types';

export const createDevServer = (variables: ConfigVariables): DevServer => {
  return (
    (variables.env.WEBPACK_SERVE && {
      open: true,
      hot: 'only',
      // compress: true,
      // http2: true,
      headers: {
        'Cache-Control': 'public, s-maxage=600, max-age=60',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      },
      client: {
        logging: 'info'
        // progress: true
      },
      devMiddleware: {
        index: true,
        // writeToDisk: true
        stats: 'normal'
      },
      server: {
        type: 'https',
        options: {
          minVersion: 'TLSv1.1'
        }
      }
    }) ||
    {}
  );
};
