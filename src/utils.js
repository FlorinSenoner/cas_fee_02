import { mapProps } from 'recompose'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import React from 'react'
import omit from 'lodash/fp/omit'

export const omitProps = keys => mapProps(props => omit(keys, props))

export const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component'

const middlewares = []
const mockStore = configureStore(middlewares)
const initialState = {
  signIn: {
    user: {
      uid: '',
      email: '',
    },
  },
}
const store = mockStore(initialState)

export const mountWithRouter = component =>
  mount(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>,
  )
    .find('MemoryRouter')
    .children()
    .children()
