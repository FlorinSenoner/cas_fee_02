import React from 'react'
import { mountWithRouter } from '../../../utils'

import Menu from '../index'
const renderedComponent = mountWithRouter(
  <Menu isDrawerOpen goBack={() => {}} goToDashboard={() => {}}>
    <div>test</div>
  </Menu>,
)

describe('<Menu />', () => {
  it('renders a Menu', () => {
    expect(renderedComponent).toMatchSnapshot()
  })
})
