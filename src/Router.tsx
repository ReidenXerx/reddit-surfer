import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthorizationPage } from './components/AuthorizationPage'
import { UserInfo } from './components/UserInfo'

const NotFound = () => <h1>404: Not Found</h1>

const RedditRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthorizationPage />} />
        <Route path="/callback" element={<AuthorizationPage />} />
        <Route path="/user" element={<UserInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RedditRouter
