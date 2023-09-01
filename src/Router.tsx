import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserInfo } from './components/UserInfo'
import { AppHeader } from './components/AppHeader'

const NotFound = () => <h1>404: Not Found</h1>

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
      </Routes>
    </BrowserRouter>
  )
}

export default RedditRouter
