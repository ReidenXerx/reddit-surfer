import { Button } from '@mui/material'
import RedditIcon from '@mui/icons-material/Reddit'
import { redirectToAutorizationPage } from '../services/OAUTH2'
import { callbackURL } from '../constants'
import { ApplicationCredentials } from '../types'
import { APPNAME, API, SECRET } from '../keys.json'
import { useAsyncEffect } from '../hooks/useAsyncEffect'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUserAndSetBearer } from '../store/slices/userThunk'
import { unwrapResult } from '@reduxjs/toolkit'

export const AuthorizationButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authorizationData: ApplicationCredentials = {
    appName: APPNAME,
    clientId: API,
    secret: SECRET,
  }

  useAsyncEffect(async () => {
    navigate(
      unwrapResult(
        await dispatch<any>(
          fetchUserAndSetBearer({ callbackURL, authorizationData }),
        ),
      ),
    )
  }, [])

  return (
    <Button
      variant="contained"
      endIcon={<RedditIcon />}
      onClick={() =>
        redirectToAutorizationPage(API, callbackURL, [
          'identity',
          'account',
          'history',
        ])
      }
    >
      Log in with Reddit
    </Button>
  )
}
