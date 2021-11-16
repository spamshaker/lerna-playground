/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/no-named-as-default
import webpack, { Compiler, Configuration, Stats } from 'webpack';
import createWebpackConfig from '../src';

interface CompilationSettings {
  options: Configuration;
}

const createCompiler = ({ options }: CompilationSettings) => webpack(options);
const run = (compiler: Compiler): Promise<Compiler> =>
  new Promise((resolve, reject) => {
    compiler.run((err?: Error, stats?: Stats) => {
      if (err || stats?.hasErrors()) {
        reject(err || stats?.toJson({ errors: true }).errors);
      }
      compiler.close(closeErr => closeErr && reject(closeErr));
      resolve(compiler);
    });
  });
const compile = (compilationSettings: CompilationSettings) => run(createCompiler(compilationSettings));
describe('Webpack Configuration Test Suite', () => {
  beforeEach(() => {
    //Node >= v12.10.0
    //fs.rmdirSync();
  });
  it('should', async () => {
    const [options] = ([] as Configuration[]).concat(
      createWebpackConfig({}, { context: path.resolve(__dirname, './fixtures/packages/module-app') })
    );
    const settings: CompilationSettings = { options };
    const result = await compile(settings);
    expect(result).toBeTruthy();
  }, 60000);
});
