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

// helpers for puppeteer since wait for navigation is not working
//
// export const getLocation = async page => page.evaluate(() => location)
//
// export const getLocationProp = async (page, prop) => (await getLocation(page))[prop]
//
// const getHistory = async page => page._client.send('Page.getNavigationHistory')
// const getHistoryEntry = async (page, index) => (await getHistory(page)).entries[index]
// const getCurrentHistoryEntry = async page => {
//   const { entries, currentIndex } = await getHistory(page)
//   return entries[currentIndex]
// }
//
//
// const pathname = await getLocationProp(page, 'pathname')
// const re = /(?<=bet\/)(.*)(?=\/invite)/
// const betId = pathname.match(re)[1]
// console.log(`A new bet with id: ${betId} was successfully created`)
//
// await page.goto('http://localhost:3000/')
// await page.goto(`http://localhost:3000/bet/${betId}/invites`)
