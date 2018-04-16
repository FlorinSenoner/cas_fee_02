import React from 'react'
import { mount } from 'enzyme'

import TakeAGuess from '../TakeAGuess'
const renderedComponent = mount(<TakeAGuess handleGuess={() => {}} />)

describe('<TakeAGuess />', () => {
  it('renders a TakeAGuess', () => {
    expect(renderedComponent).toMatchSnapshot()
  })
})
