import './App.css'
import {
  redirectToAutorizationPage,
  oauth2ParametrizedRequest,
} from './services/OAUTH2'
import { callbackURL, redditEndpoints, requestTypes } from './constants'
import { AuthorizationData } from './types'
import { APPNAME, API, SECRET } from './keys.json'

export const App = () => {
  const authorizationData: AuthorizationData = {
    appName: APPNAME,
    clientId: API,
    secret: SECRET,
  }
  return (
    <>
      <button onClick={() => redirectToAutorizationPage(API, callbackURL)}>
        Click
      </button>
      <button
        onClick={async () => {
          //const result = await getAccessToken(API, SECRET, callbackURL)
          const result = await oauth2ParametrizedRequest(
            requestTypes.accessUser,
            redditEndpoints['access'],
            authorizationData,
            { callback: callbackURL },
          )
          console.log(result)
        }}
      >
        CLICK NEXT
      </button>
    </>
  )
}

export default App
