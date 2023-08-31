import { useSelector } from 'react-redux'
import { getBearerSelector, getUserDataSelector } from '../store/selectors'
import { Box, Stack, Typography } from '@mui/material'
import { AppHeader } from './AppHeader'

export const UserInfo = () => {
  const userData = useSelector(getUserDataSelector)
  const bearer = useSelector(getBearerSelector)
  console.log(bearer, userData)

  return (
    <Stack
      width={userData.snoovatar_size[0] + 'px'}
      alignItems="center"
      p="30px"
      bgcolor="#7892F7"
      borderRadius="10px"
    >
      <AppHeader />
      <Box width={(userData.snoovatar_size[0] as unknown as number) / 2 + 'px'}>
        <Box
          component="img"
          alt="img"
          src={userData.snoovatar_img}
          width="100%"
        ></Box>
      </Box>
      <Typography variant="h6">{userData.name}</Typography>
      <Stack direction="row">
        <Stack>
          <Typography variant="subtitle1">Karma</Typography>
          <Typography variant="subtitle2">{userData.total_karma}</Typography>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Cake Day</Typography>
          <Typography variant="subtitle2">
            {new Date(userData.created_utc * 1000).toDateString()}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
