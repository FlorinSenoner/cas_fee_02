import React from 'react'
import { mountWithRouter } from '../../../utils'

import App from '../index'

const renderedComponent = mountWithRouter(<App />)

describe('<App />', () => {
  xit('renders without crashing', () => {
    console.log(renderedComponent.debug())
    expect(renderedComponent.find('App').length).toBe(1)
  })
  xit('renders an App', () => {
    expect(renderedComponent).toMatchSnapshot()
  })
})
