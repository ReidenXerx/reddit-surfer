import { useState, MouseEvent } from 'react'
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material'

type DropMenuProps = {
  snoovatar_img: string
  name: string
  fields: Record<string, () => null>
}

export const DropMenu = ({ snoovatar_img, name, fields }: DropMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const fieldsNamesAndFunctions = Object.entries(fields)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
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
        {fieldsNamesAndFunctions.map((menuItemData) => (
          <MenuItem
            key={menuItemData[0]}
            onClick={() => setAnchorEl(menuItemData[1])}
          >
            {menuItemData[0]}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
