import React from 'react'
import TextField from 'material-ui/TextField'
import { mapError } from './utils'

const MuiTextField = ({ defaultValue, ...props }) => <TextField {...mapError(props)} />

export default MuiTextField
