import { Button, Stack } from '@mui/material'
import RedditIcon from '@mui/icons-material/Reddit'
import { redirectToAutorizationPage, request } from '../services/OAUTH2'
import { callbackURL, redditEndpoints, requestTypes } from '../constants'
import { ApplicationCredentials } from '../types'
import { APPNAME, API, SECRET } from '../keys.json'
import { useAsyncEffect } from '../hooks/useAsyncEffect'
import { getQueryParameter } from '../services/utils'

export const AuthorizationPage = () => {
  const authorizationData: ApplicationCredentials = {
    appName: APPNAME,
    clientId: API,
    secret: SECRET,
  }

  useAsyncEffect(async () => {
    if (getQueryParameter('code') !== null) {
      const result = await request(
        requestTypes.accessUser,
        redditEndpoints['access'],
        authorizationData,
        { callback: callbackURL },
      )
      console.log(result)
    }
  }, [])

  return (
    <Stack alignItems="center">
      <Button
        variant="contained"
        endIcon={<RedditIcon />}
        onClick={() => redirectToAutorizationPage(API, callbackURL)}
      >
        Log in with Reddit
      </Button>
    </Stack>
  )
}
