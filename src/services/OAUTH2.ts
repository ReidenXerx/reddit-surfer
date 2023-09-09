import { requestTypes } from '../constants'
import { ApplicationCredentials, EndpointInfo } from '../types'
import { generateRandomState, getQueryParameter } from './utils'

export const redirectToAutorizationPage = (
  clientId: string,
  redirectURI: string,
) => {
  window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${generateRandomState(
    16,
  )}&redirect_uri=${redirectURI}&scope=identity%20account&duration=temporary`
}

type RequestFilling = {
  url: string
  headers: Record<string, string>
  body: string
}

export type ExternalParameters = {
  url: Record<string, string>
  headers: Record<string, string>
  body: Record<string, string | boolean>
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
      url: params?.url
        ? `${short}?${new URLSearchParams(params.url).toString()}`
        : short,
      headers: {
        Authorization: `bearer ${secret}`,
      },
      body: params?.body ? JSON.stringify(params.body) : '',
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
      url: params?.url
        ? `${short}?${new URLSearchParams(params.url).toString()}`
        : short,
      headers: params?.headers ? { ...params.headers } : {},
      body: params?.body ? JSON.stringify(params.body) : '',
    },
  } as Record<string, RequestFilling>

  const { url, headers, body } = fillingVariants[`${type}`]
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: body === '' ? undefined : body,
  })

  if (!response.ok) {
    throw new Error(
      `Network response was not ok. ${
        response.statusText
      } METHOD: ${method} HEADERS: ${JSON.stringify(headers)} BODY: ${body}`,
    )
  }

  return await response.json()
}
