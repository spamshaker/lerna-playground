import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { DefinePlugin } from 'webpack';
import { ConfigVariables, Plugins } from './types';
import { getFilenamePostfix } from './utils';

function getHTMLTemplate(WEBPACK_SERVE: boolean) {
  const externals = WEBPACK_SERVE ? [] : ['react', 'react-dom', 'redux', 'react-redux', 'redux-toolkit'];
  const extModules = externals.map(mod => `<script defer src="js/${mod}.js"></script>`).join('\n');
  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  ${extModules}
</head>
<body>
  <div id="root"></div>
</body>
</html>
`;
}

export const createPlugins = ({
  description,
  env: { WEBPACK_SERVE },
  isProduction,
  mode,
  name,
  scope,
  version
}: ConfigVariables): Plugins =>
  [
    new HtmlWebpackPlugin({
      title: description,
      templateContent: getHTMLTemplate(!!WEBPACK_SERVE),
      minify: isProduction,
      filename: `index${getFilenamePostfix(isProduction)}.html`
    }),
    WEBPACK_SERVE &&
      new ReactRefreshWebpackPlugin({
        overlay: false
      }),
    // new WebpackBar(),
    isProduction && new MiniCssExtractPlugin({ filename: `[name]${getFilenamePostfix(isProduction)}.css` }),
    new DefinePlugin({
      APP_VERSION: JSON.stringify(version),
      APP_NAME: JSON.stringify([scope, name].filter(Boolean).join('/')),
      'process.env.NODE_ENV': JSON.stringify(mode)
    }),
    !WEBPACK_SERVE &&
      new CopyPlugin({
        patterns: [
          {
            from: require.resolve(`react/umd/react.${mode}${getFilenamePostfix(isProduction)}.js`),
            to: `js/react${getFilenamePostfix(isProduction)}.js`
          },
          {
            from: require.resolve(`react-dom/umd/react-dom.${mode}${getFilenamePostfix(isProduction)}.js`),
            to: `js/react-dom${getFilenamePostfix(isProduction)}.js`
          },
          {
            from: require.resolve(`redux/dist/redux${getFilenamePostfix(isProduction)}.js`),
            to: `js/redux${getFilenamePostfix(isProduction)}.js`
          },
          {
            from: require.resolve(`react-redux/dist/react-redux${getFilenamePostfix(isProduction)}.js`),
            to: `js/react-redux${getFilenamePostfix(isProduction)}.js`
          },
          {
            from: require.resolve(`@reduxjs/toolkit/dist/redux-toolkit.umd${getFilenamePostfix(isProduction)}.js`),
            to: `js/redux-toolkit${getFilenamePostfix(isProduction)}.js`
          }
        ]
      })
  ].filter(Boolean) as Plugins;
