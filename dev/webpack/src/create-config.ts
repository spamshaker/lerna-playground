import 'webpack-dev-server';
import { Configuration, Entry, ModuleOptions } from 'webpack';
import { createDevServer } from './create-dev-server';
import { createEntry } from './create-entry';
import { createExternals } from './create-externals';
import { createModule } from './create-module';
import { createOptimization } from './create-optimization';
import { createOutput } from './create-output';
import { createPlugins } from './create-plugins';
import { createResolve } from './create-resolve';
import {
  ConfigVariables,
  CreateConfigArguments,
  CreateConfigWebpackEnv,
  DevServer,
  Mode,
  modes,
  MultiConfig,
  Optimization,
  Output,
  Plugins
} from './types';
import { buildConfigVariables } from './utils';

function createConfig(args: CreateConfigArguments): Configuration {
  const variables: ConfigVariables = buildConfigVariables(args);
  const { context, isProduction, mode, name } = variables;
  const entry: Entry = createEntry(variables);
  const output: Output = createOutput(variables);
  const plugins: Plugins = createPlugins(variables);
  const externals = createExternals(variables);
  const module: ModuleOptions = createModule(variables);
  const optimization: Optimization = createOptimization(variables);
  const devServer: DevServer = createDevServer(variables);
  const resolve = createResolve();
  return {
    name: `${name}: build mode [${mode}]`,
    stats: 'normal',
    target: 'web',
    amd: false,
    devtool: !isProduction ? 'source-map' : undefined,
    entry,
    context,
    mode,
    output,
    plugins,
    module,
    resolve,
    externals,
    optimization,
    devServer
  };
}

/**
 * @param context
 * @param mode
 * @param env
 * @param analyze
 * @param argv
 * @param rest
 * @return {MultiConfig}
 */
export const createWebpackConfig = (
  { WEBPACK_SERVE, WEBPACK_WATCH }: CreateConfigWebpackEnv,
  { context = process.cwd(), mode: _mode, env = {}, analyze, ...argv }: Partial<CreateConfigArguments> = {}
): MultiConfig => {
  return WEBPACK_SERVE || WEBPACK_WATCH || analyze || _mode
    ? createConfig({ ...argv, analyze, context, env, mode: _mode || 'development' })
    : modes.map((mode: Mode) => createConfig({ ...argv, analyze, context, env, mode }));
};
