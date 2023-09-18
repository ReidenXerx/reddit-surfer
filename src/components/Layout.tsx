import { Stack } from '@mui/material'

export const Layout = (WrappedComponent: React.ComponentType) => {
  return (layoutProps: object) => (
    <Stack width="100%" height="100vh" alignItems="center">
      <WrappedComponent {...layoutProps} />
    </Stack>
  )
}
