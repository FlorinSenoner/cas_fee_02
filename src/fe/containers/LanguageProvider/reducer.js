import { fromJS } from 'immutable'

import { DEFAULT_LOCALE } from 'fe/containers/App/constants'
import { CHANGE_LOCALE } from './constants'

const initialState = fromJS({
  locale: DEFAULT_LOCALE,
})

const languageProviderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state.set('locale', action.locale)
    default:
      return state
  }
}

export default languageProviderReducer
