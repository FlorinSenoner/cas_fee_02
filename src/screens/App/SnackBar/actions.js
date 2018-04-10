import * as actions from './constants'

export const closeSnackbar = () => ({ type: actions.CLOSE_SNACKBAR })
export const openSnackbar = () => ({ type: actions.OPEN_SNACKBAR })
export const editSnackbarText = ({ text }) => ({ type: actions.EDIT_SNACKBAR_TEXT, payload: { text } })
export const editSnackbarBetId = ({ betId }) => ({ type: actions.EDIT_SNACKBAR_BET_ID, payload: { betId } })
