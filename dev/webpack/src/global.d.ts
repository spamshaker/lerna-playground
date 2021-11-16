declare module 'node-fqdn';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOME?: string;
      PROFILE?: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
      HOST?: string;
    }
  }
}
