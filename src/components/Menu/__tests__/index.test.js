import React from 'react'
import { mountWithRouter } from '../../../utils'

import Menu from '../index'
const renderedComponent = mountWithRouter(
  <Menu isDrawerOpen>
    <div>test</div>
  </Menu>,
)

describe('<Menu />', () => {
  xit('renders without crashing', () => {
    expect(renderedComponent.find('div').length).toBe(12)
  })
  xit('renders a Menu', () => {
    expect(renderedComponent).toMatchSnapshot()
  })
})
