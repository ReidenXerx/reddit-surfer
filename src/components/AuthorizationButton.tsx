import { Button } from '@mui/material'
import RedditIcon from '@mui/icons-material/Reddit'
import { redirectToAutorizationPage, request } from '../services/OAUTH2'
import { callbackURL, redditEndpoints, requestTypes } from '../constants'
import { ApplicationCredentials } from '../types'
import { APPNAME, API, SECRET } from '../keys.json'
import { useAsyncEffect } from '../hooks/useAsyncEffect'
import { getQueryParameter } from '../services/utils'
import { useDispatch } from 'react-redux'
import { setUserAction } from '../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { setBearerAction } from '../store/slices/bearerSlice'

export const AuthorizationButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authorizationData: ApplicationCredentials = {
    appName: APPNAME,
    clientId: API,
    secret: SECRET,
  }

  useAsyncEffect(async () => {
    if (getQueryParameter('code') !== null) {
      const { access_token, expires_in } = await request(
        requestTypes.accessUser,
        redditEndpoints['access'],
        authorizationData,
        { callback: callbackURL },
      )
      dispatch(setBearerAction(access_token))
      console.log(expires_in)
      const user = await request(requestTypes.bearer, redditEndpoints['me'], {
        secret: access_token,
      } as ApplicationCredentials)
      dispatch(setUserAction(user))
      navigate('/')
    }
  }, [])

  return (
    <Button
      variant="contained"
      endIcon={<RedditIcon />}
      onClick={() => redirectToAutorizationPage(API, callbackURL)}
    >
      Log in with Reddit
    </Button>
  )
}
