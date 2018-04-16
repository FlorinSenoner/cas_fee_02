import * as actions from './constants'

export const initialState = {
  isOpen: false,
  text: '',
  betId: '',
}

const snackBar = (state = initialState, action) => {
  switch (action.type) {
    case actions.OPEN_SNACKBAR:
      return { ...state, isOpen: true }
    case actions.CLOSE_SNACKBAR:
      return { ...state, isOpen: false }
    case actions.EDIT_SNACKBAR_TEXT:
      return { ...state, text: action.payload.text }
    case actions.EDIT_SNACKBAR_BET_ID:
      return { ...state, betId: action.payload.betId }
    default:
      return state
  }
}

export default snackBar
