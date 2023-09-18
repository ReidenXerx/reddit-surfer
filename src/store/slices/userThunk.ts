import { createAsyncThunk } from '@reduxjs/toolkit'
import { getQueryParameter } from '../../services/utils'
import { request } from '../../services/OAUTH2'
import { redditEndpoints, requestTypes } from '../../constants'
import { setBearerAction } from './bearerSlice'
import { setUserAction } from './userSlice'
import { ApplicationCredentials } from '../../types'

export const fetchUserAndSetBearer = createAsyncThunk(
  'user/fetchAndSetBearer',
  async (
    {
      callbackURL,
      authorizationData,
    }: Record<string, string | ApplicationCredentials>,
    { dispatch },
  ) => {
    if (getQueryParameter('code') !== null) {
      const { access_token } = await request(
        requestTypes.accessUser,
        redditEndpoints['access'],
        authorizationData as ApplicationCredentials,
        { callback: callbackURL as string },
      )

      dispatch(setBearerAction(access_token))

      const user = await request(requestTypes.bearer, redditEndpoints['me'], {
        secret: access_token,
      } as ApplicationCredentials)

      dispatch(setUserAction(user))

      return '/'
    }
  },
)
