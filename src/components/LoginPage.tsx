import { Stack } from '@mui/material'
import { AuthorizationButton } from './AuthorizationButton'
import bg from '../asssets/login.png'

export const LoginPage = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="97vh"
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundPositionX: 'center',
        backgroundPositionY: '0',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        '@media screen and (max-width:600px)': {
          backgroundSize: 'contain',
          backgroundPositionY: '63%',
        },
      }}
    >
      <AuthorizationButton />
    </Stack>
  )
}
