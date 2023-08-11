import './App.css'
import { useAsyncEffect } from './hooks/useAsyncEffect'
import {
  getAccessToken,
  oauth2Request,
  redirectToAutorizationPage,
} from './services/OAUTH2'
import { redditEndpoints } from './constants'
import { APPNAME, API, SECRET } from './keys.json'

export const App = () => {
  // useAsyncEffect(async () => {
  //   const { access_token } = await oauth2Request(
  //     redditEndpoints['access'],
  //     APPNAME,
  //     API,
  //     SECRET,
  //   )
  //   console.log(access_token)
  // })
  return (
    <>
      <button
        onClick={() =>
          redirectToAutorizationPage(API, 'http://localhost:5173/callback')
        }
      >
        Click
      </button>
      <button
        onClick={async () => {
          const result = await getAccessToken(
            API,
            SECRET,
            'http://localhost:5173/callback',
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
