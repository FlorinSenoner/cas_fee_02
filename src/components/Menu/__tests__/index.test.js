import React from 'react'
import { mountWithRouter } from '../../../utils'

import Menu from '../index'
const renderedComponent = mountWithRouter(
  <Menu isDrawerOpen>
    <div>test</div>
  </Menu>,
)

describe('<Menu />', () => {
  it('renders without crashing', () => {
    // console.log(renderedComponent.debug())
    expect(renderedComponent.find('div').length).toBe(12)
  })
  it('renders a Menu', () => {
    expect(renderedComponent).toMatchSnapshot()
  })
})
