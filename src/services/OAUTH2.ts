import { requestTypes } from '../constants'
import { ApplicationCredentials, EndpointInfo } from '../types'
import { generateRandomState, getQueryParameter } from './utils'

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

type RequestFilling = {
  url: string
  headers: Record<string, string>
  body: string
}

type ExternalParameters = {
  url: Record<string, string>
  headers: Record<string, string>
  body: Record<string, string>
  callback: string
}

export const request = async (
  type: string,
  { short, method }: EndpointInfo,
  { appName, clientId, secret }: ApplicationCredentials,
  params?: Partial<ExternalParameters>,
) => {
  const fillingVariants = {
    [requestTypes.access]: {
      url: short,
      headers: {
        'User-Agent': appName,
        Authorization: 'Basic ' + btoa(clientId + ':' + secret),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    },
    [requestTypes.bearer]: {
      url: params
        ? `${short}?${new URLSearchParams(params.url).toString()}`
        : short,
      headers: {
        Authorization: `Bearer ${secret}`,
      },
      body: '',
    },
    [requestTypes.accessUser]: {
      url: short,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(clientId + ':' + secret),
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: secret,
        grant_type: 'authorization_code',
        code: getQueryParameter('code') || '',
        redirect_uri: !!params ? params.callback : '',
      } as Record<string, string>).toString(),
    },
    [requestTypes.general]: {
      url: params
        ? `${short}?${new URLSearchParams(params.url).toString()}`
        : short,
      headers: params ? { ...params.body } : {},
      body: params ? new URLSearchParams(params.body).toString() : '',
    },
  } as Record<string, RequestFilling>

  const { url, headers, body } = fillingVariants[`${type}`]
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: body,
  })

  if (!response.ok) {
    throw new Error(`Network response was not ok. ${response.statusText}`)
  }

  return await response.json()
}
