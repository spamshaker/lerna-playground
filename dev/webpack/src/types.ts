import { LoaderOptions as TsLoaderOptions } from 'ts-loader/dist/interfaces';
import { Configuration, default as webpack, Entry } from 'webpack';
import { PackageJson } from '../declarations/PackageJson';

export const modes = ['development', 'production'] as const;
export type Mode = typeof modes[number];
export type CreateConfigWebpackEnv = {
  WEBPACK_SERVE?: boolean;
  WEBPACK_WATCH?: boolean;
};
export type CreateConfigArguments = {
  context: string;
  mode: Mode;
  env: CreateConfigWebpackEnv;
  entry?: Entry;
  analyze?: boolean;
};
export type ConfigVariables = PackageJson &
  CreateConfigArguments & {
    isProduction: boolean;
    scope: string;
  };
export type Optimization = Configuration['optimization'];
export type Output = Configuration['output'];
export type Plugins = Configuration['plugins'];
export type DevServer = Configuration['devServer'];
export type MultiConfig = Configuration | Parameters<typeof webpack>[0];

// --- TSLoaderOptions type patches
type JSXEmit = 'preserve' | 'react-native' | 'react' | 'react-jsx' | 'react-jsxdev';
type CompilerOptions = Omit<TsLoaderOptions['compilerOptions'], 'jsx'> & { jsx: JSXEmit };
export type TSLoaderOptions = Partial<
  Omit<TsLoaderOptions, 'compilerOptions'> & {
    compilerOptions: CompilerOptions;
  }
>;
