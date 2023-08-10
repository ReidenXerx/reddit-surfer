import { EndpointInfo } from '../types'

export const oauth2Request = async (
  { short, method }: EndpointInfo,
  appName: string,
  clientId: string,
  secret: string,
) => {
  const headers = {
    'User-Agent': appName,
    Authorization: 'Basic ' + btoa(clientId + ':' + secret),
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const body = 'grant_type=client_credentials'

  const response = await fetch(short, {
    method: method,
    headers,
    body,
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }

  const data = await response.json()
  return data
}

export const oauth2RequestWithBearer = async (
  { short, method }: EndpointInfo,
  bearer: string,
  params?: { [id: string]: string },
) => {
  const url = params
    ? `${short}?${new URLSearchParams(params).toString()}`
    : short
  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }

  const data = await response.json()
  return data
}
