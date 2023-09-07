import { FormControlLabel, Switch } from '@mui/material'
import { useState } from 'react'

interface ControlledSwitchProps {
  label: string
  defaultState: boolean
  onSwitch?: (newState: boolean) => void
}

export const ControlledSwitch = (props: ControlledSwitchProps) => {
  const { label, defaultState, onSwitch } = props
  const [checked, setChecked] = useState(defaultState)
  const handleChange = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(checked)
    onSwitch && onSwitch(checked)
  }
  return (
    <FormControlLabel
      control={
        <Switch checked={checked} onChange={handleChange} name={label} />
      }
      label={label}
    />
  )
}
