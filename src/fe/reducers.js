import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

import globalReducer from './containers/App/reducer'
import languageProviderReducer from './containers/LanguageProvider/reducer'

// Initial routing state, make route immutable
const routeInitialState = fromJS({
  location: null,
})

// Merge route into the global application state
const routeReducer = (state = routeInitialState, action) => {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      })
    default:
      return state
  }
}

/**
 * Creates the main reducer.js with the dynamically injected ones
 */
const createReducer = injectedReducers =>
  combineReducers({
    route: routeReducer,
    global: globalReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  })

export default createReducer
