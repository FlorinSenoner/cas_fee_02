import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

import globalReducer from 'fe/containers/App/reducer'
import languageProviderReducer from 'fe/containers/LocaleSwitcher/reducer'

// Initial routing state, make route immutable
const routeInitialState = fromJS({
  location: null,
})

// Merge route into the global application state
const routeReducer = (state = routeInitialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      })
    default:
      return state
  }
}

// Creates the main reducer with the dynamically injected ones
const createReducer = injectedReducers =>
  combineReducers({
    route: routeReducer,
    global: globalReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  })

export default createReducer
