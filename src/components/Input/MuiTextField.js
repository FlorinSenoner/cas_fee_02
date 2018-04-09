import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'

import { mapError } from './utils'

const MuiTextField = ({ defaultValue, ...props }) => <TextField {...mapError(props)} />

MuiTextField.propTypes = {
  defaultValue: PropTypes.string,
}

export default MuiTextField
