import { EndpointInfo } from '../types'
import { generateRandomState, getQueryParameter } from './functions'

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

  return await response.json()
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

  return await response.json()
}

export const redirectToAutorizationPage = (
  clientId: string,
  redirectURI: string,
) => {
  window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${generateRandomState(
    16,
  )}&redirect_uri=${redirectURI}&scope=identity&duration=temporary`
}

export const getAccessToken = async (
  clientId: string,
  secret: string,
  redirectURI: string,
) => {
  const code = getQueryParameter('code') || ''
  const body: Record<string, string> = {
    client_id: clientId,
    client_secret: secret,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectURI,
  }

  const headers = new Headers()
  headers.append('Content-Type', 'application/x-www-form-urlencoded')
  headers.append('Authorization', 'Basic ' + btoa(clientId + ':' + secret))

  const response = await fetch('/access', {
    method: 'POST',
    headers: headers,
    body: new URLSearchParams(body),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }

  return await response.json()
}
