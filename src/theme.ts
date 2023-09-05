import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#7892f7',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Customize the button's root style here
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: '#f44336', // Custom background color
            color: '#ffffff', // Custom text color
          },
        },
      ],
    },
  },
})
