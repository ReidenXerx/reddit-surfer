import { ThemeProvider } from '@mui/material'
import './App.css'
import { AuthorizationPage } from './components/AuthorizationPage'
import { theme } from './theme'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthorizationPage />
    </ThemeProvider>
  )
}

export default App
