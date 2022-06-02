export enum EnvTypes {
  PROD = 'Production',
  DEV = 'Development',
}

export const API_URL: string = import.meta.env.VITE_API_URL
export const IS_DEV = import.meta.env.DEV
export const IS_PROD = import.meta.env.PROD
export const DOMAIN = IS_DEV
  ? 'http://localhost:3000'
  : 'https://parintinsdigital.com.br/'
