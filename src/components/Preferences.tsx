import { useSelector } from 'react-redux'
import { redditEndpoints, requestTypes } from '../constants'
import { useAsyncEffect } from '../hooks/useAsyncEffect'
import { request } from '../services/OAUTH2'
import { ApplicationCredentials } from '../types'
import { getBearerSelector } from '../store/selectors'
import { useState } from 'react'

export const Preferences = () => {
  const access_token = useSelector(getBearerSelector)
  const [prefsData, setPrefsData] = useState()
  useAsyncEffect(async () => {
    setPrefsData(
      await request(requestTypes.bearer, redditEndpoints['prefs_get'], {
        secret: access_token,
      } as ApplicationCredentials),
    )
  })
  return (
    <div>
      <button onClick={() => console.log(prefsData)}></button>
    </div>
  )
}
