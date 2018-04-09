import React from 'react'
import PropTypes from 'prop-types'
import Switch from 'material-ui/Switch'

const MuiSwitch = ({ input: { onChange, value, ...inputProps }, meta, ...props }) => (
  <Switch
    {...inputProps}
    {...props}
    checked={!!value}
    onChange={(event, isInputChecked) => {
      onChange(isInputChecked)
    }}
  />
)

MuiSwitch.propTypes = {
  defaultChecked: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired,
  }),
  meta: PropTypes.object.isRequired,
}

export default MuiSwitch
