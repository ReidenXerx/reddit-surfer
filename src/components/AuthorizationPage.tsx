import { Button, Stack } from '@mui/material'
import RedditIcon from '@mui/icons-material/Reddit'
import { redirectToAutorizationPage, request } from '../services/OAUTH2'
import {
  callbackURL,
  redditEndpoints,
  requestTypes,
  websiteURL,
} from '../constants'
import { ApplicationCredentials } from '../types'
import { APPNAME, API, SECRET } from '../keys.json'
import { useAsyncEffect } from '../hooks/useAsyncEffect'
import { getQueryParameter } from '../services/utils'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAction } from '../store/slices/userSlice'
import { userSelector } from '../store/selectors'

export const AuthorizationPage = () => {
  const dispatch = useDispatch()

  const authorizationData: ApplicationCredentials = {
    appName: APPNAME,
    clientId: API,
    secret: SECRET,
  }

  useAsyncEffect(async () => {
    if (getQueryParameter('code') !== null) {
      const { access_token } = await request(
        requestTypes.accessUser,
        redditEndpoints['access'],
        authorizationData,
        { callback: callbackURL },
      )
      const user = await request(requestTypes.bearer, redditEndpoints['me'], {
        secret: access_token,
      } as ApplicationCredentials)
      dispatch(setUserAction(user))
      //console.log(useSelector(userSelector))
      //window.location.href = ` ${websiteURL}/user`
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
