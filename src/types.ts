export enum RequestMethods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}
export type EndpointInfo = {
  full: string
  short: string
  method: RequestMethods
}
