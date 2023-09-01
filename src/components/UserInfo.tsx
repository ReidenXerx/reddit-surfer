import { useSelector } from 'react-redux'
import { getBearerSelector, getUserDataSelector } from '../store/selectors'
import { Box, Stack, Typography } from '@mui/material'
import { RootState } from '../store/store'

export const UserInfo = () => {
  const { snoovatar_size, snoovatar_img, name, total_karma, created_utc } =
    useSelector<RootState, Record<string, any>>(getUserDataSelector)
  const bearer = useSelector(getBearerSelector)

  return bearer ? (
    <Stack
      width={snoovatar_size[0] + 'px'}
      alignItems="center"
      p="30px"
      bgcolor="#7892F7"
      borderRadius="10px"
    >
      <Box width={snoovatar_size[0] / 2 + 'px'}>
        <Box component="img" alt="img" src={snoovatar_img} width="100%"></Box>
      </Box>
      <Typography variant="h6">{name}</Typography>
      <Stack direction="row">
        <Stack>
          <Typography variant="subtitle1">Karma</Typography>
          <Typography variant="subtitle2">{total_karma}</Typography>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Cake Day</Typography>
          <Typography variant="subtitle2">
            {new Date(created_utc * 1000).toDateString()}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <Typography variant="h1">Login if you want to watch</Typography>
  )
}
