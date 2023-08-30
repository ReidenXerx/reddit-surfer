import { ThemeProvider } from '@mui/material'
import './App.css'
import { theme } from './theme'
import RedditRouter from './Router'
import { Provider } from 'react-redux'
import store from './store/store'

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RedditRouter />
      </ThemeProvider>
    </Provider>
  )
}

export default App
