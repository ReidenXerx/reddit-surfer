import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserInfo } from './components/UserInfo'
import { AppHeader } from './components/AppHeader'
import { LoginPage } from './components/LoginPage'
import { Layout } from './components/Layout'
import { Preferences } from './components/Preferences'

const NotFound = Layout(() => <h1>404: Not Found</h1>)
const PreferencesLayout = Layout(Preferences)

const RedditRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AppHeader />
            </>
          }
        />
        <Route
          path="/callback"
          element={
            <>
              <AppHeader />
            </>
          }
        />
        <Route
          path="/user/*"
          element={
            <>
              <AppHeader />
              <UserInfo />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/preferences" element={<PreferencesLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RedditRouter
