import { ResolveOptions } from 'webpack';

export const createResolve = (): ResolveOptions => ({
  extensions: ['.ts', '.tsx', '.js']
});
