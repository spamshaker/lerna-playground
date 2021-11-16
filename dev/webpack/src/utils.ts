import fs from 'fs';
import path from 'path';
import { PackageJson } from '../declarations/PackageJson';
import { ConfigVariables, CreateConfigArguments } from './types';

export const pascalCase: (str: string) => string = (str: string): string =>
  (' ' + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
export const readJsonSync = (...pathElements: string[]): Record<string, unknown> =>
  JSON.parse(fs.readFileSync(path.resolve(...pathElements)).toString());

export function buildConfigVariables(env: CreateConfigArguments): ConfigVariables {
  const isProduction = env.mode === 'production';
  const { name: rawName, ...rest }: PackageJson = readJsonSync(env.context, 'package.json') as PackageJson;
  const [scope, name] = rawName?.replace('@', '').split('/') || [];
  return { isProduction, scope, name, ...rest, ...env };
}

export const getFilenamePostfix = (isProduction: boolean) => (isProduction && '.min') || '';
