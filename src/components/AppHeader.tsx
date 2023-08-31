import { AppBar, Avatar, Box, Stack, Typography } from '@mui/material'
import { getUserDataSelector } from '../store/selectors'
import { useSelector } from 'react-redux'
import { DropMenu } from './DropMenu'

export const AppHeader = () => {
  const {
    snoovatar_img,
    total_karma,
    name,
    subreddit: { display_name_prefixed },
  } = useSelector(getUserDataSelector)

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
          <DropMenu
            snoovatar_img={snoovatar_img}
            name={name}
            total_karma={total_karma}
          />
        </Box>
      </Stack>
    </AppBar>
  )
}
