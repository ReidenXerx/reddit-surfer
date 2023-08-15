import { RequestMethods } from './constants'

export type EndpointInfo = {
  full: string
  short: string
  method: RequestMethods
}

export type ApplicationCredentials = {
  appName: string
  clientId: string
  secret: string
}
