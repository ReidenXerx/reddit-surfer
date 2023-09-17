import { AppBar, Avatar, Box, Stack, Typography } from '@mui/material'
import { selectBearer, selectUserData } from '../store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { DropMenu } from './DropMenu'
import { AuthorizationButton } from './AuthorizationButton'
import { useNavigate } from 'react-router-dom'
import { setBearerAction } from '../store/slices/bearerSlice'
import { setUserAction } from '../store/slices/userSlice'

export const AppHeader = () => {
  const data = useSelector(selectUserData)
  const snoovatar_img = data?.snoovatar_img ?? ''
  const name = data?.name ?? ''
  const url = data?.subreddit?.url ?? ''
  const display_name_prefixed = data?.subreddit?.display_name_prefixed ?? ''
  const bearer = useSelector(selectBearer)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fields = {
    User: () => {
      navigate(url)
      return null
    },
    Logout: () => {
      navigate('/login')
      dispatch(setBearerAction(null))
      dispatch(setUserAction({}))
      return null
    },
  }

  return (
    <AppBar>
      <Stack
        direction="row"
        alignItems="center"
        height="70px"
        pr="30px"
        pl="30px"
      >
        <Box mr="30px">
          <Avatar src={snoovatar_img}></Avatar>
        </Box>
        <Typography>{display_name_prefixed}</Typography>
        <Box ml="auto">
          {!!bearer ? (
            <DropMenu
              snoovatar_img={snoovatar_img}
              name={name}
              fields={fields}
            />
          ) : (
            <AuthorizationButton />
          )}
        </Box>
      </Stack>
    </AppBar>
  )
}
