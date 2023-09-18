import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme'
import RedditRouter from './Router'
import { Provider } from 'react-redux'
import store from './store/store'

export const App = () => {
  return (
    <CssBaseline>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RedditRouter />
        </ThemeProvider>
      </Provider>
    </CssBaseline>
  )
}

export default App
