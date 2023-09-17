import { useSelector } from 'react-redux'
import { redditEndpoints, requestTypes } from '../constants'
import { useAsyncEffect } from '../hooks/useAsyncEffect'
import { request } from '../services/OAUTH2'
import { ApplicationCredentials } from '../types'
import { selectBearer } from '../store/selectors'
import { useState } from 'react'
import { returnObjectAsJSX } from '../services/utils'
import { Box, Stack, Tab, Tabs } from '@mui/material'
import { CustomTabPanel } from './CustomTabPanel'
import { ControlledSwitch } from './ControlledSwitch'

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
})

export const Preferences = () => {
  const access_token = useSelector(selectBearer)
  const [prefsData, setPrefsData] = useState({})
  const [value, setValue] = useState(0)
  const { video_autoplay, feed_recommendations_enabled } = prefsData as Record<
    string,
    boolean
  >

  const handleChange = (_event: React.SyntheticEvent, newValue: number) =>
    setValue(newValue)

  const applyPreferencesChanges = (
    bodyParams: Record<string, string | boolean>,
  ) =>
    request(
      requestTypes.bearer,
      redditEndpoints['prefs_patch'],
      {
        secret: access_token,
      } as ApplicationCredentials,
      {
        body: bodyParams,
      },
    )

  useAsyncEffect(async () => {
    setPrefsData(
      await request(requestTypes.bearer, redditEndpoints['prefs_get'], {
        secret: access_token,
      } as ApplicationCredentials),
    )
  })
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Notifications" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Stack>
          <ControlledSwitch
            label="Video Autoplay"
            defaultState={video_autoplay}
            onSwitch={(newState) => {
              applyPreferencesChanges({
                video_autoplay: newState,
              })
            }}
          />
          <ControlledSwitch
            label="Feed Recommendations"
            defaultState={feed_recommendations_enabled}
            onSwitch={(newState) => {
              applyPreferencesChanges({
                feed_recommendations_enabled: newState,
              })
            }}
          />
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {returnObjectAsJSX({ video_autoplay, feed_recommendations_enabled })}
      </CustomTabPanel>
    </Box>
  )
}
