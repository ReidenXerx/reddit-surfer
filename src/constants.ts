import { EndpointInfo } from './types'

export enum RequestMethods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
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
