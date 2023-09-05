import { Stack } from '@mui/material'

export const Layout = <Props extends object>(
  WrappedComponent: React.ComponentType<Props>,
) => {
  return (props: Props) => {
    return (
      <Stack width="100%" height="100vh" alignItems="center">
        <WrappedComponent {...props} />
      </Stack>
    )
  }
}
