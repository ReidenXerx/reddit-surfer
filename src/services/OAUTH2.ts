import { requestTypes } from '../constants'
import { ApplicationCredentials, EndpointInfo } from '../types'
import { generateRandomState, getQueryParameter } from './utils'

export const redirectToAutorizationPage = (
  clientId: string,
  redirectURI: string,
) => {
  window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${generateRandomState(
    16,
  )}&redirect_uri=${redirectURI}&scope=identity&duration=temporary`
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
