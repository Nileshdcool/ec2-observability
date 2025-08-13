import packageJson from '../package.json';

export const APP_VERSION = packageJson.version;
export const APP_ENV = process.env.NEXT_PUBLIC_ENV;
