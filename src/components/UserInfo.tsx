import { useSelector } from 'react-redux'
import { selectBearer, selectUserData } from '../store/selectors'
import { Box, Stack, Tooltip, Typography, styled } from '@mui/material'
import { RootState } from '../store/store'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate } from 'react-router-dom'
import { UnknownResponseData } from '../types'

export const UserInfo = () => {
  const { snoovatar_size, snoovatar_img, name, total_karma, created_utc } =
    useSelector<RootState, UnknownResponseData>(selectUserData)
  const bearer = useSelector(selectBearer)
  const navigate = useNavigate()

  const WhiteBoldTypography = styled(Typography)`
    color: white;
    font-weight: bold;
  `

  const WhiteTypography = styled(Typography)`
    color: #eee;
  `

  return bearer ? (
    <Stack
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        width={snoovatar_size[0] + 'px'}
        position="relative"
        alignItems="center"
        p="30px"
        bgcolor="#7892F7"
        borderRadius="10px"
      >
        <Tooltip title="Settings">
          <Box
            position="absolute"
            top="6px"
            right="6px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="white"
            borderRadius="4px"
            width="30px"
            height="30px"
            onClick={() => navigate('/preferences')}
            sx={{
              cursor: 'pointer',
            }}
          >
            <SettingsIcon color="primary" />
          </Box>
        </Tooltip>
        <Box width={snoovatar_size[0] / 2 + 'px'}>
          <Box component="img" alt="img" src={snoovatar_img} width="100%"></Box>
        </Box>
        <WhiteBoldTypography variant="h6">{name}</WhiteBoldTypography>
        <Stack direction="row" width="100%" justifyContent="space-around">
          <Stack>
            <WhiteBoldTypography variant="subtitle1">Karma</WhiteBoldTypography>
            <WhiteTypography variant="subtitle2">{total_karma}</WhiteTypography>
          </Stack>
          <Stack>
            <WhiteBoldTypography variant="subtitle1">
              Cake Day
            </WhiteBoldTypography>
            <WhiteTypography variant="subtitle2">
              {new Date(created_utc * 1000).toDateString()}
            </WhiteTypography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <Typography variant="h1">Login if you want to watch</Typography>
  )
}
