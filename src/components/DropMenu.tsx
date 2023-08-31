import { useState, MouseEvent } from 'react'
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material'

type DropMenuProps = {
  snoovatar_img: string
  total_karma: string
  name: string
}

export const DropMenu = ({
  snoovatar_img,
  total_karma,
  name,
}: DropMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      {' '}
      <Box
        sx={{
          cursor: 'pointer',
          padding: '10px',
        }}
        display="flex"
        alignItems="center"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        bgcolor="#fff"
        borderRadius="10px"
      >
        <Avatar src={snoovatar_img}></Avatar>
        <Typography color="#000">{name}</Typography>
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  )
}
