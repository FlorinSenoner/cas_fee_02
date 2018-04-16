import reducer, { initialState } from '../reducer'
import * as actions from '../constants'

describe('test snackBar reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual({ betId: '', isOpen: false, text: '' })
  })

  it('should handle CLOSE_SNACKBAR', () => {
    const closeSnackbar = {
      type: actions.CLOSE_SNACKBAR,
    }
    expect(reducer(initialState, closeSnackbar)).toEqual({ betId: '', isOpen: false, text: '' })
  })

  it('should handle OPEN_SNACKBAR', () => {
    const openSnackbar = {
      type: actions.OPEN_SNACKBAR,
    }
    expect(reducer(initialState, openSnackbar)).toEqual({ betId: '', isOpen: true, text: '' })
  })

  it('should handle EDIT_SNACKBAR_TEXT', () => {
    const editSnackbarText = {
      type: actions.EDIT_SNACKBAR_TEXT,
      payload: {
        text: 'Flannel next level shabby chic roof party prism trust fund.',
      },
    }
    expect(reducer(initialState, editSnackbarText)).toEqual({
      betId: '',
      isOpen: false,
      text: 'Flannel next level shabby chic roof party prism trust fund.',
    })
  })

  it('should handle EDIT_SNACKBAR_TEXT', () => {
    const editSnackbarBetId = {
      type: actions.EDIT_SNACKBAR_BET_ID,
      payload: {
        betId: '1W3e4as8HHD321D',
      },
    }
    expect(reducer(initialState, editSnackbarBetId)).toEqual({
      betId: '1W3e4as8HHD321D',
      isOpen: false,
      text: '',
    })
  })
})
