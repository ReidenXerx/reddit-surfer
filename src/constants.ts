import { EndpointInfo } from './types'

export enum RequestMethods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

export enum requestTypes {
  access = 'ACCESS',
  accessUser = 'ACCESS_USER',
  bearer = 'BEARER',
  general = 'GENERAL',
}

export const redditEndpoints: { [id: string]: EndpointInfo } = {
  access: {
    full: 'https://www.reddit.com/api/v1/access_token',
    short: '/access',
    method: RequestMethods.post,
  },
  me: {
    full: 'https://www.reddit.com/api/v1/me',
    short: '/me',
    method: RequestMethods.get,
  },
  collection: {
    full: 'https://www.reddit.com/api/v1/collections/collection',
    short: '/collection',
    method: RequestMethods.get,
  },
}

export const callbackURL = 'http://localhost:5173/callback' // TODO: change when prod
export const websiteURL = 'http://localhost:5173' // TODO: change when prod
