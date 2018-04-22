import React from 'react'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'

import Form from '../Form'

const mockStore = configureStore([])
const initialState = {
  form: {
    CreateBetForm: {
      values: {
        visibility: false,
      },
      initial: {
        visibility: false,
      },
      syncErrors: {
        title: 'Field is required',
      },
      registeredFields: {
        title: {
          name: 'title',
          type: 'Field',
          count: 1,
        },
        description: {
          name: 'description',
          type: 'Field',
          count: 1,
        },
        endDate: {
          name: 'endDate',
          type: 'Field',
          count: 1,
        },
        endTime: {
          name: 'endTime',
          type: 'Field',
          count: 1,
        },
        visibility: {
          name: 'visibility',
          type: 'Field',
          count: 1,
        },
      },
    },
  },
}
const store = mockStore(initialState)

const renderedComponent = mount(
  <Provider store={store}>
    <Form onSubmit={() => {}} />
  </Provider>,
)

describe('<Form />', () => {
  test('renders a Form', () => {
    expect(renderedComponent).toMatchSnapshot()
  })
})
