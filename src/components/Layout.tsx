import { Stack } from '@mui/material'

export const Layout = <Props extends object>(
  WrappedComponent: React.ComponentType<Props>,
) => {
  return (layoutProps: Props) => {
    return (
      <Stack width="100%" height="100vh" alignItems="center">
        <WrappedComponent {...layoutProps} />
      </Stack>
    )
  }
}
