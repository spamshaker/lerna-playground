import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypescript from 'react-refresh-typescript';
import { RuleSetRule } from 'webpack';
import { ConfigVariables, TSLoaderOptions } from './types';

const bootstrapRule = {
  test: /bootstrap\.tsx$/,
  loader: 'bundle-loader',
  options: {
    lazy: true
  }
};
const getTypescriptLoader = (isProduction: boolean): RuleSetRule & { options: TSLoaderOptions } => {
  const options: TSLoaderOptions = {
    transpileOnly: !isProduction,
    onlyCompileBundledFiles: true,
    compilerOptions: {
      jsx: 'react-jsx'
    }
  };
  return {
    test: /\.(ts|tsx)$/i,
    loader: require.resolve('ts-loader'),
    exclude: ['/node_modules/'],
    options
  };
};
const getTypescriptHMRLoader = (isProduction: boolean) => {
  const loader = getTypescriptLoader(isProduction);
  const { options } = loader;
  if (options) {
    options.getCustomTransformers = () => ({
      before: [ReactRefreshTypescript()]
    });
  }
  return loader;
};
const fontsLoader = {
  test: /\.(eot|svg|ttf|woff|woff2)$/i,
  type: 'asset/resource',
  generator: {
    filename: 'static/[name][ext]'
  }
};
const imagesLoader = {
  test: /\.(png|jpg|gif)$/i,
  type: 'asset/resource',
  generator: {
    filename: 'static/[name][ext]'
  }
};
const getCssLoader = (isProduction: boolean, test: RuleSetRule['test'] = /\.css$/i): RuleSetRule => ({
  test,
  use: [
    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
    { loader: 'css-loader', options: { sourceMap: !isProduction } }
  ]
});
const getLessLoader = (isProduction: boolean): RuleSetRule => {
  const loader = getCssLoader(isProduction, /\.less$/i);
  if (Array.isArray(loader.use)) {
    loader.use.push({ loader: 'less-loader', options: { sourceMap: !isProduction } });
  }
  return loader;
};
export const createRules = ({ isProduction, WEBPACK_SERVE }: ConfigVariables) => {
  return [
    bootstrapRule,
    WEBPACK_SERVE ? getTypescriptHMRLoader(WEBPACK_SERVE) : getTypescriptLoader(isProduction),
    getCssLoader(isProduction),
    getLessLoader(isProduction),
    fontsLoader,
    imagesLoader
  ];
};
