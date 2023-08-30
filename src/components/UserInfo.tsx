import { useSelector } from 'react-redux'
import { userSelector } from '../store/selectors'
import React from 'react'

export const UserInfo = () => {
  const userData = useSelector(userSelector)
  const userDataArr = Object.keys(userData).map((key) => ({
    key,
    value: userData[key],
  }))
  return (
    <>
      <h1>User</h1>
      {userDataArr.map(({ key, value }, index) => (
        <React.Fragment key={index}>
          <p>{key}</p>
          <p>{value}</p>
        </React.Fragment>
      ))}
    </>
  )
}
