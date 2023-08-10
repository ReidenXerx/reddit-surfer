import './App.css'
import { useAsyncEffect } from './hooks/useAsyncEffect'
import { oauth2Request, oauth2RequestWithBearer } from './services/OAUTH2'
import { redditEndpoints } from './constants'
import { APPNAME, API, SECRET } from './keys.json'

export const App = () => {
  useAsyncEffect(async () => {
    const { access_token } = await oauth2Request(
      redditEndpoints['access'],
      APPNAME,
      API,
      SECRET,
    )
    console.log(access_token)
    const me = await oauth2RequestWithBearer(
      redditEndpoints['me'],
      access_token,
    )
    console.log(me)
  })
  return <></>
}

export default App
